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

/* =========================================
   Send Friend Request
========================================= */

const sendFriendRequest = asyncHandler(async (req, res) => {
  const senderId = req.user._id;

  const receiverId = req.params.id;

  // Cannot send request to yourself
  if (senderId.toString() === receiverId) {
    return errorResponse(res, 400, "You cannot send a request to yourself.");
  }

  const sender = await User.findById(senderId);

  const receiver = await User.findById(receiverId);

  if (!receiver) {
    return errorResponse(res, 404, "User not found.");
  }

  // Already Friends

  if (sender.friends.includes(receiverId)) {
    return errorResponse(res, 400, "Already friends.");
  }

  // Already Sent Request

  if (sender.sentRequests.includes(receiverId)) {
    return errorResponse(res, 400, "Friend request already sent.");
  }

  // Block Check

  if (receiver.blockedUsers.includes(senderId)) {
    return errorResponse(res, 403, "You are blocked by this user.");
  }

  // Add Request

  sender.sentRequests.push(receiverId);

  receiver.friendRequests.push(senderId);

  await sender.save();

  await receiver.save();

  return successResponse(
    res,

    "Friend Request Sent Successfully.",
  );
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
