const express = require("express");
const router = express.Router();

const { protect, adminOnly } = require("../middleware/authMiddleware");
const { getMe, updateMe, getAllUsers } = require("../controllers/userController");

router.get("/me", protect, getMe);
router.put("/me", protect, updateMe);
router.get("/", protect, adminOnly, getAllUsers);

module.exports = router;
