const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const productRoutes = require("./routes/productRoutes");
const orderRoutes = require("./routes/orderRoutes");
const userRoutes = require("./routes/userRoutes");

require("dotenv").config();

console.log("🔥 THIS IS MY REAL SERVER.JS");

const app = express();

app.use(cors());
app.use(express.json());

console.log("server.js loaded");
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "KRITHIKSHA Mart Backend Running 🚀",
  });
});

const PORT = process.env.PORT || 5001;
connectDB();
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});