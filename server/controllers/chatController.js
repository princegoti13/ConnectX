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

/* =========================================
   Get Conversations
========================================= */

const getConversations = asyncHandler(async (req, res) => {

    const userId = req.user._id;

    const conversations = await Conversation.find({

        participants: userId

    })

    .populate(
        "participants",
        "firstName lastName username profilePicture isOnline lastSeen"
    )

    .populate(
        "lastMessage"
    )

    .sort({
        updatedAt: -1
    });

    const result = conversations.map(conversation => {

        const otherUser = conversation.participants.find(

            user => user._id.toString() !== userId.toString()

        );

        return {

            conversationId: conversation._id,

            user: otherUser,

            lastMessage: conversation.lastMessage,

            updatedAt: conversation.updatedAt

        };

    });

    return successResponse(

        res,

        "Conversation List",

        result

    );

});

/* =========================================
   Get Messages
========================================= */

const getMessages = asyncHandler(async (req, res) => {

    const conversationId = req.params.id;

    const conversation = await Conversation.findById(conversationId);

    if (!conversation) {

        return errorResponse(
            res,
            404,
            "Conversation not found."
        );

    }

    if (
        !conversation.participants
            .map(id => id.toString())
            .includes(req.user._id.toString())
    ) {

        return errorResponse(
            res,
            403,
            "Unauthorized."
        );

    }

    const messages = await Message.find({

        conversation: conversationId

    })
    .populate(
        "sender",
        "firstName lastName username profilePicture"
    )
    .sort({
        createdAt: 1
    });

    return successResponse(

        res,

        "Messages",

        messages

    );

});

module.exports = {
  sendMessage,
  getConversations,
  getMessages,
};
