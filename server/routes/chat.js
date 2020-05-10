const express = require("express");
const router = express.Router();

const chatController = require("../controller/chat.controller");
const tokenMiddleware = require("../middleware/token");

router.get("/", tokenMiddleware.checkToken, chatController.getChats);

router.get(
  "/:receiver",
  tokenMiddleware.checkToken,
  chatController.getByReceiver
);

router.post(
  "/:receiver",
  tokenMiddleware.checkToken,
  chatController.validate("sendChat"),
  chatController.sendChat
);

router.post(
  "/:receiver/message",
  tokenMiddleware.checkToken,
  chatController.validate("sendChat"),
  chatController.sendMessage
);

module.exports = router;
