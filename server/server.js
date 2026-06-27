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

// ===============================
// Middleware
// ===============================
app.use(cors());
app.use(helmet());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

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

app.listen(PORT, () => {
  console.log("=================================");
  console.log("🚀 ConnectX Server Started");
  console.log(`🌐 http://localhost:${PORT}`);
  console.log("=================================");
});
