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
const cookieOptions = require("../helpers/cookieOptions");
const generateToken = require("../helpers/tokenHelper");

const { hashPassword, comparePassword } = require("../helpers/passwordHelper");

const { successResponse, errorResponse } = require("../helpers/responseHelper");

/* =========================================
   Register User
========================================= */

const registerUser = asyncHandler(async (req, res) => {
  const { firstName, lastName, username, email, password } = req.body;

  const emailExists = await User.findOne({ email });

  if (emailExists) {
    return errorResponse(res, 400, "Email already exists.");
  }

  const usernameExists = await User.findOne({ username });

  if (usernameExists) {
    return errorResponse(res, 400, "Username already exists.");
  }

  const hashedPassword = await hashPassword(password);

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

/* =========================================
   Login User
========================================= */

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

  res.cookie("token", token, cookieOptions);

  return res.status(200).json({
    success: true,
    message: "Login Successful.",
    user: {
      id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      username: user.username,
      email: user.email,
    },
  });
});

/* =========================================
   Logout User
========================================= */

const logoutUser = asyncHandler(async (req, res) => {
  res.clearCookie("token");

  return successResponse(res, "Logout Successful.");
});

/* =========================================
   Current User
========================================= */

const getCurrentUser = asyncHandler(async (req, res) => {
  return successResponse(res, "Current User", req.user);
});

/* =========================================
   Exports
========================================= */

module.exports = {
  registerUser,
  loginUser,
  logoutUser,
  getCurrentUser,
};
