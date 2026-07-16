const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes.js");
const productRoutes = require("./routes/productRoutes.js");
const orderRoutes = require("./routes/orderRoutes");
const userRoutes = require("./routes/userRoutes");

require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json()); 
app.use((req, res, next) => {
  console.log(req.method, req.originalUrl);
  next();
});
console.log(authRoutes);

app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/orders", (req, res, next) => {
  console.log("✅ Orders middleware reached");
  next();
});


app.use("/api/users", userRoutes);

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