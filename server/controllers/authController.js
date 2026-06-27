/**
 * ---------------------------------------
 * Project : ConnectX
 * File : authController.js
 * Purpose : Authentication Controller
 * Author : Prince Goti
 * ---------------------------------------
 */

const User = require("../models/User");

const asyncHandler = require("../helpers/asyncHandler");

const { hashPassword } = require("../helpers/passwordHelper");

const { successResponse, errorResponse } = require("../helpers/responseHelper");

const generateToken = require("../helpers/tokenHelper");
const { comparePassword } = require("../helpers/passwordHelper");

const registerUser = asyncHandler(async (req, res) => {
  const { firstName, lastName, username, email, password } = req.body;

  // ===========================
  // Email Exists
  // ===========================

  const emailExists = await User.findOne({ email });

  if (emailExists) {
    return errorResponse(res, 400, "Email already exists.");
  }

  // ===========================
  // Username Exists
  // ===========================

  const usernameExists = await User.findOne({
    username,
  });

  if (usernameExists) {
    return errorResponse(res, 400, "Username already exists.");
  }

  // ===========================
  // Hash Password
  // ===========================

  const hashedPassword = await hashPassword(password);

  // ===========================
  // Save User
  // ===========================

  const newUser = await User.create({
    firstName,

    lastName,

    username,

    email,

    password: hashedPassword,
  });

  return successResponse(res, "Registration Successful.", {
    id: newUser._id,
    firstName: newUser.firstName,
    lastName: newUser.lastName,
    username: newUser.username,
    email: newUser.email,
  });
});

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return errorResponse(res, 400, "Email and Password are required.");
  }

  const user = await User.findOne({ email });

  if (!user) {
    return errorResponse(res, 400, "Invalid Email or Password.");
  }

  const isMatch = await comparePassword(password, user.password);

  if (!isMatch) {
    return errorResponse(res, 400, "Invalid Email or Password.");
  }

  const token = generateToken(user._id);

  return res.status(200).json({
    success: true,
    message: "Login Successful.",
    token,
    user: {
      id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      username: user.username,
      email: user.email,
    },
  });
});

module.exports = {
  registerUser,
  loginUser,
};
