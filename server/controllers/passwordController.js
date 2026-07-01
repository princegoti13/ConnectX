/**
 * ---------------------------------------
 * Project : ConnectX
 * File : passwordController.js
 * Purpose : Password Controller
 * Author : Prince Goti
 * ---------------------------------------
 */

const User = require("../models/User");

const Otp = require("../models/Otp");

const asyncHandler = require("../helpers/asyncHandler");

const {
  successResponse,

  errorResponse,
} = require("../helpers/responseHelper");

/* ==========================================
   Send OTP
========================================== */

const sendOtp = asyncHandler(async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return errorResponse(
      res,

      400,

      "Email Is Required.",
    );
  }

  const user = await User.findOne({
    email,
  });

  if (!user) {
    return errorResponse(
      res,

      404,

      "Email Not Registered.",
    );
  }

  const otp = Math.floor(100000 + Math.random() * 900000).toString();

  console.log("================================");

  console.log("OTP :", otp);

  console.log("================================");

  await Otp.deleteMany({
    email,
  });

  await Otp.create({
    email,

    otp,

    expiresAt: new Date(Date.now() + 5 * 60 * 1000),
  });

  return successResponse(
    res,

    "OTP Sent Successfully.",
  );
});

/* ==========================================
   Verify OTP
========================================== */

const verifyOtp = asyncHandler(async (req, res) => {

    const { email, otp } = req.body;

    if (!email || !otp) {

        return errorResponse(
            res,
            400,
            "Email And OTP Are Required."
        );

    }

    const otpRecord = await Otp.findOne({
        email,
        otp
    });

    if (!otpRecord) {

        return errorResponse(
            res,
            400,
            "Invalid OTP."
        );

    }

    if (otpRecord.expiresAt < new Date()) {

        await Otp.deleteOne({
            _id: otpRecord._id
        });

        return errorResponse(
            res,
            400,
            "OTP Expired."
        );

    }

    return successResponse(
        res,
        "OTP Verified Successfully."
    );

});

/* ==========================================
   Reset Password
========================================== */

const { hashPassword } = require("../helpers/passwordHelper");

const resetPassword = asyncHandler(async (req, res) => {

    const { email, password, confirmPassword } = req.body;

    if (!email || !password || !confirmPassword) {

        return errorResponse(
            res,
            400,
            "All Fields Are Required."
        );

    }

    if (password !== confirmPassword) {

        return errorResponse(
            res,
            400,
            "Passwords Do Not Match."
        );

    }

    const user = await User.findOne({ email });

    if (!user) {

        return errorResponse(
            res,
            404,
            "User Not Found."
        );

    }

    const hashedPassword = await hashPassword(password);

    user.password = hashedPassword;

    await user.save();

    await Otp.deleteMany({ email });

    return successResponse(
        res,
        "Password Reset Successfully."
    );

});

module.exports = {
  sendOtp,

  verifyOtp,

  resetPassword,
};
