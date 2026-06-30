/**
 * ---------------------------------------
 * Project : ConnectX
 * File : chatController.js
 * Purpose : Chat Controller
 * Author : Prince Goti
 * ---------------------------------------
 */

const Conversation = require("../models/Conversation");
const Message = require("../models/Message");
const Friend = require("../models/Friend");

const asyncHandler = require("../helpers/asyncHandler");

const { successResponse, errorResponse } = require("../helpers/responseHelper");

/* =========================================
   Send Message
========================================= */

const sendMessage = asyncHandler(async (req, res) => {
  const senderId = req.user._id;

  const { receiverId, text } = req.body;

  if (!receiverId || !text) {
    return errorResponse(res, 400, "Receiver and message are required.");
  }

  // Check Friendship

  const friendship = await Friend.findOne({
    $or: [
      {
        user1: senderId,
        user2: receiverId,
      },

      {
        user1: receiverId,
        user2: senderId,
      },
    ],
  });

  if (!friendship) {
    return errorResponse(res, 403, "You can only chat with friends.");
  }

  // Find Conversation

  let conversation = await Conversation.findOne({
    participants: {
      $all: [senderId, receiverId],
    },
  });

  // Create Conversation

  if (!conversation) {
    conversation = await Conversation.create({
      participants: [senderId, receiverId],
    });
  }

  // Save Message

  const message = await Message.create({
    conversation: conversation._id,

    sender: senderId,

    text,
  });

  conversation.lastMessage = message._id;

  await conversation.save();

  return successResponse(res, "Message Sent Successfully.", message);
});

module.exports = {
  sendMessage,
};
