/**
 * ---------------------------------------
 * Project : ConnectX
 * File : friendController.js
 * Purpose : Friend Controller
 * Author : Prince Goti
 * ---------------------------------------
 */

const User = require("../models/User");

const asyncHandler = require("../helpers/asyncHandler");

const { successResponse, errorResponse } = require("../helpers/responseHelper");

const Friend = require("../models/Friend");

const FriendRequest = require("../models/FriendRequest");

/* =========================================
   Send Friend Request
========================================= */

const sendFriendRequest = asyncHandler(async (req, res) => {
  const senderId = req.user._id;
  const receiverId = req.params.id;

  if (senderId.toString() === receiverId) {
    return errorResponse(res, 400, "You cannot send request to yourself.");
  }

  const receiver = await User.findById(receiverId);

  if (!receiver) {
    return errorResponse(res, 404, "User not found.");
  }

  // Already Friends

  const alreadyFriends = await Friend.findOne({
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

  if (alreadyFriends) {
    return errorResponse(res, 400, "Already Friends.");
  }

  // Already Pending

  const pending = await FriendRequest.findOne({
    sender: senderId,
    receiver: receiverId,
    status: "pending",
  });

  if (pending) {
    return errorResponse(res, 400, "Friend request already sent.");
  }

  // Create Request

  await FriendRequest.create({
    sender: senderId,

    receiver: receiverId,

    status: "pending",
  });

  return successResponse(res, "Friend Request Sent Successfully.");
});

/* =========================================
   Get Pending Friend Requests
========================================= */

const getPendingRequests = asyncHandler(async (req, res) => {

    const requests = await FriendRequest.find({

        receiver: req.user._id,

        status: "pending"

    }).populate(

        "sender",

        "firstName lastName username profilePicture"

    );

    return successResponse(

        res,

        "Pending Requests",

        requests

    );

});

module.exports = {
  sendFriendRequest,

  getPendingRequests,
};
