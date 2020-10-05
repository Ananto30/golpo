const { body, validationResult, param } = require("express-validator");

const chatService = require("../service/conversation.service");

exports.getChats = async (req, res) => {
  try {
    const { username } = req.decoded;
    const chats = await chatService.getChatListAndLastChatForUser(username);

    res.status(200).json({ chats: chats });
  } catch (err) {
    res.status(500).json({ errors: err.message });
    return;
  }
};

exports.getByReceiver = async (req, res) => {
  try {
    const { username } = req.decoded;
    const { receiver } = req.params;
    const chats = await chatService.getChatByUsernameForUser(username, receiver);

    res.status(200).json(chats);
  } catch (err) {
    res.status(500).json({ errors: err.message });
    return;
  }
};

exports.sendChat = async (req, res) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      res.status(422).json({ errors: errors.array() });
      return;
    }

    const { text } = req.body;
    const { receiver } = req.params;
    const { username } = req.decoded;

    const chats = await chatService.sendChat(username, receiver, text);

    res.status(200).json(chats);
  } catch (err) {
    res.status(500).json({ errors: err.message });
    return;
  }
};

exports.sendMessage = async (req, res) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      res.status(422).json({ errors: errors.array() });
      return;
    }

    const { text } = req.body;
    const { receiver } = req.params;
    const { username } = req.decoded;

    const chats = await chatService.sendMessage(username, receiver, text);

    res.status(200).json(chats);
  } catch (err) {
    res.status(500).json({ errors: err.message });
    return;
  }
};

exports.validate = (method) => {
  switch (method) {
    case "sendChat": {
      return [param("receiver").not().isEmpty(), body("text").not().isEmpty()];
    }
  }
};
