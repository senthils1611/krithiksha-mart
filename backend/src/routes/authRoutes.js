const express = require("express");
const router = express.Router();

const { register, login } = require("../controllers/authController");

router.post("/register", register);
//router.post("/login", login);

console.log("authRoutes.js loaded");

router.get("/", (req, res) => {
  res.json({
    success: true,
    message: "GET Auth OK",
  });
});

router.post("/login", (req, res) => {
  res.json({
    success: true,
    message: "POST Login OK",
  });
});

module.exports = router;