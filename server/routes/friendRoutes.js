const express = require("express");

const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");

const {
  sendFriendRequest,
  getPendingRequests,
  acceptFriendRequest,
  rejectFriendRequest,
  cancelFriendRequest,
  getFriendsList,
  removeFriend,
} = require("../controllers/friendController");

router.post("/send/:id", authMiddleware, sendFriendRequest);
router.get("/requests", authMiddleware, getPendingRequests);
router.post("/accept/:id", authMiddleware, acceptFriendRequest);
router.post("/reject/:id", authMiddleware, rejectFriendRequest);
router.post("/cancel/:id", authMiddleware, cancelFriendRequest);
router.delete("/remove/:id", authMiddleware, removeFriend);
router.get("/list", authMiddleware, getFriendsList);

module.exports = router;
