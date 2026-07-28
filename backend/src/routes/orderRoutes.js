const express = require("express");
const router = express.Router();

const { protect, adminOnly } = require("../middleware/authMiddleware");

const {
  createOrder,
  createRazorpayOrder,
  verifyRazorpayPayment,
  getMyOrders,
  getAllOrders,
  getOrderById,
  updateOrderStatus,
  deleteOrder,
} = require("../controllers/orderController");

// Cash on Delivery
router.post("/", protect, createOrder);

// Razorpay flow
router.post("/razorpay/create", protect, createRazorpayOrder);
router.post("/razorpay/verify", protect, verifyRazorpayPayment);

router.get("/my", protect, getMyOrders);

router.get("/", protect, adminOnly, getAllOrders);

router.get("/:id", protect, getOrderById);

router.put("/:id", protect, adminOnly, updateOrderStatus);

router.delete("/:id", protect, adminOnly, deleteOrder);

module.exports = router;