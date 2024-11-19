const Message = require("../models/Message");

// Send Direct Message
exports.sendMessage = async (req, res) => {
  const { senderId, receiverId, message } = req.body;

  try {
    const newMessage = new Message({ senderId, receiverId, message });
    await newMessage.save();

    res.status(201).json({ message: "Message sent successfully", chatId: newMessage._id });
  } catch (error) {
    res.status(500).json({ message: "Failed to send message", error });
  }
};
