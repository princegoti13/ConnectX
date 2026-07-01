/**
 * ---------------------------------------
 * Project : ConnectX
 * File : server.js
 * Purpose : Main Server File
 * Author : Prince Goti
 * ---------------------------------------
 */

require("dotenv").config();

const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");

const app = express();
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const friendRoutes = require("./routes/friendRoutes");
const chatRoutes = require("./routes/chatRoutes");
const passwordRoutes = require("./routes/passwordRoutes");

// ===============================
// Middleware
// ===============================
app.use(
  cors({
    origin: [
      "http://localhost:4200",
      "http://127.0.0.1:5500",
      "http://localhost:5500",
    ],
    credentials: true,
  }),
);
app.use(helmet());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use("/api/auth", authRoutes);
app.use("/api/friends", friendRoutes);
app.use("/api/chat", chatRoutes);
app.use("/api/password",passwordRoutes,);

// ===============================
// Test Route
// ===============================
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    project: "ConnectX",
    message: "🚀 ConnectX Server Is Running Successfully",
  });
});

// ===============================
// 404 Route
// ===============================

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route Not Found",
  });
});

// ===============================
// Server
// ===============================
const PORT = process.env.PORT || 5000;
connectDB();

app.listen(PORT, () => {
  console.log("=================================");
  console.log("🚀 ConnectX Server Started");
  console.log(`🌐 http://localhost:${PORT}`);
  console.log("=================================");
});
