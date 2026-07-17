const express = require("express");
const router = express.Router();

router.get("/test", (req, res) => {
  res.json({ ok: true });
});

console.log("authRoutes loaded");

const { login } = require("../controllers/authController");

router.post("/login", login);
module.exports = router;


