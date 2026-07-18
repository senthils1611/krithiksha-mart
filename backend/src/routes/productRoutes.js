const express = require("express");
const {
  protect,
  adminOnly,
} = require("../middleware/authMiddleware");
const upload = require("../middleware/uploadMiddleware");

const {
  uploadImage,
  addProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
} = require("../controllers/productController");

const router = express.Router();

router.post("/upload/image", protect, adminOnly, upload.single("image"), uploadImage);

router.post("/", protect, adminOnly, addProduct);

router.put("/:id", protect, adminOnly, updateProduct);

router.delete("/:id", protect, adminOnly, deleteProduct);

router.get("/", getProducts);

router.get("/:id", getProductById);

module.exports = router;
