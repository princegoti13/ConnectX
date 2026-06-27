/**
 * ---------------------------------------
 * Project : ConnectX
 * File : authValidator.js
 * Purpose : Authentication Validation
 * Author : Prince Goti
 * ---------------------------------------
 */

const validator = require("validator");

const validateRegister = (req, res, next) => {
  const { firstName, lastName, username, email, password, confirmPassword } =
    req.body;

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

  if (firstName.length < 2 || firstName.length > 25) {
    return res.status(400).json({
      success: false,
      message: "First name must be between 2 and 25 characters.",
    });
  }

  if (lastName.length < 2 || lastName.length > 25) {
    return res.status(400).json({
      success: false,
      message: "Last name must be between 2 and 25 characters.",
    });
  }

  if (!validator.isEmail(email)) {
    return res.status(400).json({
      success: false,
      message: "Invalid email address.",
    });
  }

  if (!validator.matches(username, /^[a-z0-9_]{4,20}$/)) {
    return res.status(400).json({
      success: false,
      message:
        "Username must contain only lowercase letters, numbers and underscore (4-20 characters).",
    });
  }

  if (password !== confirmPassword) {
    return res.status(400).json({
      success: false,
      message: "Passwords do not match.",
    });
  }

  if (!validator.isStrongPassword(password)) {
    return res.status(400).json({
      success: false,
      message: "Password is not strong enough.",
    });
  }

  next();
};

module.exports = {
  validateRegister,
};
