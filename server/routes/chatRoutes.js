const express = require("express");

const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");

const { sendMessage } = require("../controllers/chatController");

router.post("/send", authMiddleware, sendMessage);

module.exports = router;
