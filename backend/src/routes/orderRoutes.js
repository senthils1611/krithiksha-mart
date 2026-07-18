const express = require("express");
const router = express.Router();

const { protect, adminOnly } = require("../middleware/authMiddleware");

const {
  createOrder,
  getMyOrders,
  getAllOrders,
  getOrderById,
  updateOrderStatus,
  deleteOrder,
} = require("../controllers/orderController");

router.post("/", protect, createOrder);

router.get("/my", protect, getMyOrders);

router.get("/", protect, adminOnly, getAllOrders);

router.get("/:id", protect, getOrderById);

router.put("/:id", protect, adminOnly, updateOrderStatus);

router.delete("/:id", protect, adminOnly, deleteOrder);

module.exports = router;
