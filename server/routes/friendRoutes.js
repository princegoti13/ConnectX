const express = require("express");

const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");

const {
  sendFriendRequest,
  getPendingRequests,
} = require("../controllers/friendController");

router.post("/send/:id", authMiddleware, sendFriendRequest);

router.get("/requests", authMiddleware, getPendingRequests);

module.exports = router;
