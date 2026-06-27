const express = require("express");

const router = express.Router();

const { registerUser, loginUser } = require("../controllers/authController");

const { validateRegister } = require("../validators/authValidator");

router.post("/register", validateRegister, registerUser);

router.post("/login", loginUser);

module.exports = router;
