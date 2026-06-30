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


/* =========================================
   Accept Friend Request
========================================= */

const acceptFriendRequest = asyncHandler(async (req, res) => {

    const requestId = req.params.id;

    const request = await FriendRequest.findById(requestId);

    if (!request) {
        return errorResponse(res, 404, "Friend request not found.");
    }

    if (request.receiver.toString() !== req.user._id.toString()) {
        return errorResponse(res, 403, "Unauthorized.");
    }

    const alreadyFriend = await Friend.findOne({

        $or: [

            {
                user1: request.sender,
                user2: request.receiver
            },

            {
                user1: request.receiver,
                user2: request.sender
            }

        ]

    });

    if (alreadyFriend) {
        return errorResponse(res, 400, "Already friends.");
    }

    await Friend.create({

        user1: request.sender,

        user2: request.receiver

    });

    await FriendRequest.findByIdAndDelete(requestId);

    return successResponse(

        res,

        "Friend Request Accepted Successfully."

    );

});

/* =========================================
   Reject Friend Request
========================================= */

const rejectFriendRequest = asyncHandler(async (req, res) => {

    const requestId = req.params.id;

    const request = await FriendRequest.findById(requestId);

    if (!request) {
        return errorResponse(res, 404, "Friend request not found.");
    }

    if (request.receiver.toString() !== req.user._id.toString()) {
        return errorResponse(res, 403, "Unauthorized.");
    }

    await FriendRequest.findByIdAndDelete(requestId);

    return successResponse(
        res,
        "Friend Request Rejected Successfully."
    );

});

/* =========================================
   Cancel Friend Request
========================================= */

const cancelFriendRequest = asyncHandler(async (req, res) => {

    const requestId = req.params.id;

    const request = await FriendRequest.findById(requestId);

    if (!request) {
        return errorResponse(
            res,
            404,
            "Friend request not found."
        );
    }

    if (request.sender.toString() !== req.user._id.toString()) {
        return errorResponse(
            res,
            403,
            "Unauthorized."
        );
    }

    await FriendRequest.findByIdAndDelete(requestId);

    return successResponse(
        res,
        "Friend Request Cancelled Successfully."
    );

});

/* =========================================
   Get Friends List
========================================= */

const getFriendsList = asyncHandler(async (req, res) => {

    const userId = req.user._id;

    const friends = await Friend.find({

        $or: [

            { user1: userId },

            { user2: userId }

        ]

    })
    .populate(
        "user1",
        "firstName lastName username profilePicture isOnline lastSeen"
    )
    .populate(
        "user2",
        "firstName lastName username profilePicture isOnline lastSeen"
    );

    const result = friends.map(friend => {

        if (friend.user1._id.toString() === userId.toString()) {
            return friend.user2;
        }

        return friend.user1;

    });

    return successResponse(
        res,
        "Friends List",
        result
    );

});

/* =========================================
   Remove Friend
========================================= */

const removeFriend = asyncHandler(async (req, res) => {

    const userId = req.user._id;

    const friendId = req.params.id;

    const friendship = await Friend.findOne({

        $or: [

            {
                user1: userId,
                user2: friendId
            },

            {
                user1: friendId,
                user2: userId
            }

        ]

    });

    if (!friendship) {

        return errorResponse(
            res,
            404,
            "Friend not found."
        );

    }

    await Friend.findByIdAndDelete(friendship._id);

    return successResponse(
        res,
        "Friend Removed Successfully."
    );

});

  module.exports = {
    sendFriendRequest,
    getPendingRequests,
    acceptFriendRequest,
    rejectFriendRequest,
    cancelFriendRequest,
    getFriendsList,
    removeFriend,
  };
