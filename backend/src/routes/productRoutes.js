const express = require("express");
const {
  protect,
  adminOnly,
} = require("../middleware/authMiddleware");

const {
  addProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
} = require("../controllers/productController");

const router = express.Router();

router.post("/", protect, adminOnly, addProduct);

router.put("/:id", protect, adminOnly, updateProduct);

router.delete("/:id", protect, adminOnly, deleteProduct);

router.get("/", getProducts);

router.get("/:id", getProductById);

module.exports = router;