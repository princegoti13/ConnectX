/**
 * ---------------------------------------
 * Project : ConnectX
 * File : chatRoutes.js
 * Purpose : Chat Routes
 * Author : Prince Goti
 * ---------------------------------------
 */

const express = require("express");

const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");

const {
  sendMessage,
  getConversations,
  getMessages,
} = require("../controllers/chatController");

router.post("/send", authMiddleware, sendMessage);

router.get("/conversations", authMiddleware, getConversations);
router.get("/messages/:id", authMiddleware, getMessages);

module.exports = router;
