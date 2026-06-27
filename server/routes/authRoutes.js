/**
 * ---------------------------------------
 * Project : ConnectX
 * File : authRoutes.js
 * Purpose : Authentication Routes
 * Author : Prince Goti
 * ---------------------------------------
 */

const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");

const {
  registerUser,
  loginUser,
  logoutUser,
  getCurrentUser,
} = require("../controllers/authController");

const { validateRegister } = require("../validators/authValidator");

router.post("/register", validateRegister, registerUser);

router.post("/login", loginUser);

router.post("/logout", logoutUser);

router.get("/me", authMiddleware, getCurrentUser);

module.exports = router;
