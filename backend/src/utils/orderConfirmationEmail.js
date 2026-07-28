function buildOrderConfirmationEmail(order) {
  const itemsHtml = order.items
    .map(
      (item) => `
        <tr>
          <td style="padding:12px 0;border-bottom:1px solid #eee;">${item.name}</td>
          <td style="padding:12px 0;border-bottom:1px solid #eee;text-align:center;">${item.quantity}</td>
          <td style="padding:12px 0;border-bottom:1px solid #eee;text-align:right;">₹${item.price}</td>
          <td style="padding:12px 0;border-bottom:1px solid #eee;text-align:right;">₹${item.price * item.quantity}</td>
        </tr>
      `
    )
    .join("");

  const html = `
    <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;color:#333;">
      <div style="background:linear-gradient(135deg,#f97316,#ef4444);padding:32px;text-align:center;border-radius:12px 12px 0 0;">
        <h1 style="color:#fff;margin:0;">KRITHIKSHA MART</h1>
        <p style="color:#fff;opacity:0.9;margin:8px 0 0;">Order Confirmed!</p>
      </div>

      <div style="padding:32px;border:1px solid #eee;border-top:none;border-radius:0 0 12px 12px;">
        <p>Hi ${order.customer.fullName},</p>
        <p>Thank you for your order! Here are your order details:</p>

        <p style="margin:16px 0;">
          <strong>Order ID:</strong> #${order._id.toString().slice(-8).toUpperCase()}<br/>
          <strong>Payment Method:</strong> ${order.paymentMethod}<br/>
          <strong>Payment Status:</strong> ${order.paymentStatus}
        </p>

        <table style="width:100%;border-collapse:collapse;margin:24px 0;">
          <thead>
            <tr>
              <th style="text-align:left;padding-bottom:8px;border-bottom:2px solid #f97316;">Item</th>
              <th style="text-align:center;padding-bottom:8px;border-bottom:2px solid #f97316;">Qty</th>
              <th style="text-align:right;padding-bottom:8px;border-bottom:2px solid #f97316;">Price</th>
              <th style="text-align:right;padding-bottom:8px;border-bottom:2px solid #f97316;">Total</th>
            </tr>
          </thead>
          <tbody>
            ${itemsHtml}
          </tbody>
        </table>

        <p style="text-align:right;font-size:18px;font-weight:bold;color:#f97316;">
          Total: ₹${order.totalAmount}
        </p>

        <div style="background:#f9fafb;padding:16px;border-radius:8px;margin-top:24px;">
          <strong>Delivery Address</strong>
          <p style="margin:8px 0 0;">
            ${order.customer.address}, ${order.customer.city} - ${order.customer.pincode}<br/>
            Phone: ${order.customer.phone}
          </p>
        </div>

        <p style="margin-top:32px;color:#777;font-size:14px;">
          We'll notify you when your order ships. Thanks for shopping with KRITHIKSHA MART!
        </p>
      </div>
    </div>
  `;

  return {
    subject: `Order Confirmed - #${order._id.toString().slice(-8).toUpperCase()}`,
    html,
  };
}

module.exports = buildOrderConfirmationEmail;