const crypto = require("crypto");
const Order = require("../models/Order");
const Product = require("../models/Product");
const razorpay = require("../config/razorpay");
const sendEmail = require("../utils/sendEmail");
const buildOrderConfirmationEmail = require("../utils/orderConfirmationEmail");

// Shared helper: validate items against real DB prices/stock, return computed totals
async function buildOrderItems(items) {
  let totalAmount = 0;
  const orderItems = [];

  for (const item of items) {
    const product = await Product.findById(item.productId || item.product);

    if (!product) {
      throw { status: 404, message: `Product not found: ${item.productId || item.product}` };
    }

    if (product.stock !== undefined && product.stock < item.quantity) {
      throw { status: 400, message: `Insufficient stock for ${product.name}` };
    }

    const lineTotal = product.price * item.quantity;
    totalAmount += lineTotal;

    orderItems.push({
      product: product._id,
      name: product.name,
      price: product.price,
      quantity: item.quantity,
      image: product.images?.[0] || "",
    });
  }

  return { orderItems, totalAmount };
}

async function deductStock(orderItems) {
  for (const item of orderItems) {
    const product = await Product.findById(item.product);
    if (product && product.stock !== undefined) {
      product.stock -= item.quantity;
      await product.save();
    }
  }
}

function sendOrderConfirmation(order) {
  const { subject, html } = buildOrderConfirmationEmail(order);
  sendEmail({ to: order.customer.email, subject, html });
}

// Place a Cash on Delivery order — logged-in users only
exports.createOrder = async (req, res) => {
  try {
    const { customer, items } = req.body;

    if (!items || items.length === 0) {
      return res.status(400).json({
        success: false,
        message: "No order items provided",
      });
    }

    const { orderItems, totalAmount } = await buildOrderItems(items);

    const order = await Order.create({
      user: req.user._id,
      customer,
      items: orderItems,
      totalAmount,
      paymentMethod: "Cash on Delivery",
      paymentStatus: "Pending",
    });

    await deductStock(orderItems);

    sendOrderConfirmation(order);

    res.status(201).json({
      success: true,
      message: "Order placed successfully",
      order,
    });
  } catch (error) {
    res.status(error.status || 500).json({
      success: false,
      message: error.message,
    });
  }
};

// Step 1 of Razorpay flow: compute real total, create a Razorpay order
exports.createRazorpayOrder = async (req, res) => {
  try {
    const { items } = req.body;

    if (!items || items.length === 0) {
      return res.status(400).json({
        success: false,
        message: "No order items provided",
      });
    }

    const { totalAmount } = await buildOrderItems(items);

    const razorpayOrder = await razorpay.orders.create({
      amount: Math.round(totalAmount * 100),
      currency: "INR",
      receipt: `receipt_${Date.now()}`,
    });

    res.status(200).json({
      success: true,
      razorpayOrderId: razorpayOrder.id,
      amount: razorpayOrder.amount,
      currency: razorpayOrder.currency,
      keyId: process.env.RAZORPAY_KEY_ID,
    });
  } catch (error) {
    res.status(error.status || 500).json({
      success: false,
      message: error.message,
    });
  }
};

// Step 2 of Razorpay flow: verify payment signature, then create the real Order
exports.verifyRazorpayPayment = async (req, res) => {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      customer,
      items,
    } = req.body;

    if (
      !razorpay_order_id ||
      !razorpay_payment_id ||
      !razorpay_signature
    ) {
      return res.status(400).json({
        success: false,
        message: "Missing payment verification details",
      });
    }

    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest("hex");

    if (expectedSignature !== razorpay_signature) {
      return res.status(400).json({
        success: false,
        message: "Payment verification failed",
      });
    }

    const { orderItems, totalAmount } = await buildOrderItems(items);

    const order = await Order.create({
      user: req.user._id,
      customer,
      items: orderItems,
      totalAmount,
      paymentMethod: "Razorpay",
      paymentStatus: "Paid",
      razorpayOrderId: razorpay_order_id,
      razorpayPaymentId: razorpay_payment_id,
    });

    await deductStock(orderItems);

    sendOrderConfirmation(order);

    res.status(201).json({
      success: true,
      message: "Payment verified, order placed successfully",
      order,
    });
  } catch (error) {
    res.status(error.status || 500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get the logged-in user's own orders
exports.getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id })
      .populate("items.product")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: orders.length,
      orders,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get all orders — admin only
exports.getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("items.product")
      .populate("user", "name email")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: orders.length,
      orders,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get a single order — must belong to the user, unless admin
exports.getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate("items.product")
      .populate("user", "name email");

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    const isOwner = order.user && order.user._id.equals(req.user._id);

    if (!isOwner && req.user.role !== "admin") {
      return res.status(403).json({
        success: false,
        message: "Not authorized to view this order",
      });
    }

    res.status(200).json({
      success: true,
      order,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Update order status — admin only
exports.updateOrderStatus = async (req, res) => {
  try {
    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { orderStatus: req.body.orderStatus },
      { new: true, runValidators: true }
    );

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Order updated",
      order,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Delete an order — admin only
exports.deleteOrder = async (req, res) => {
  try {
    const order = await Order.findByIdAndDelete(req.params.id);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Order deleted",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};