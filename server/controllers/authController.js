/**
 * ---------------------------------------
 * Project : ConnectX
 * File : authController.js
 * Purpose : Authentication Controller
 * Author : Prince Goti
 * ---------------------------------------
 */

const User = require("../models/User");
const validator = require("validator");
const bcrypt = require("bcrypt");

const registerUser = async (req, res) => {
  try {
    const { firstName, lastName, username, email, password, confirmPassword } =
      req.body;

    // ===========================
    // Empty Validation
    // ===========================

    if (
      !firstName ||
      !lastName ||
      !username ||
      !email ||
      !password ||
      !confirmPassword
    ) {
      return res.status(400).json({
        success: false,
        message: "All fields are required.",
      });
    }

    // ===========================
    // Email Validation
    // ===========================

    if (!validator.isEmail(email)) {
      return res.status(400).json({
        success: false,
        message: "Invalid email address.",
      });
    }

    // ===========================
    // Password Match
    // ===========================

    if (password !== confirmPassword) {
      return res.status(400).json({
        success: false,
        message: "Passwords do not match.",
      });
    }

    // ===========================
    // Password Strength
    // ===========================

    if (
      !validator.isStrongPassword(password, {
        minLength: 8,
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 1,
      })
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Password must contain uppercase, lowercase, number and special character.",
      });
    }

    // ===========================
    // Check Email
    // ===========================

    const emailExists = await User.findOne({ email });

    if (emailExists) {
      return res.status(400).json({
        success: false,
        message: "Email already exists.",
      });
    }

    // ===========================
    // Check Username
    // ===========================

    const usernameExists = await User.findOne({
      username,
    });

    if (usernameExists) {
      return res.status(400).json({
        success: false,
        message: "Username already exists.",
      });
    }

    // ===========================
    // Hash Password
    // ===========================

    const hashedPassword = await bcrypt.hash(password, 10);

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

    return res.status(201).json({
      success: true,

      message: "Registration Successful.",

      user: {
        id: newUser._id,

        firstName: newUser.firstName,

        lastName: newUser.lastName,

        username: newUser.username,

        email: newUser.email,
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,

      message: error.message,
    });
  }
};

module.exports = {
  registerUser,
};
