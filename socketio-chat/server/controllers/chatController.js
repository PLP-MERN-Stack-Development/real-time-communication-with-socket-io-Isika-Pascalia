// server/controllers/chatController.js
import { formatMessage } from "../utils/formatMessage.js";

let onlineUsers = new Set();

export const handleJoin = (io, socket, username) => {
  socket.username = username;
  onlineUsers.add(username);
  io.emit("onlineUsers", Array.from(onlineUsers));
  io.emit("notification", `${username} joined the chat`);
};

export const handleMessage = (io, socket, msg) => {
  const message = formatMessage(socket.username, msg);
  io.emit("receiveMessage", message);
};

export const handleTyping = (socket, username) => {
  socket.broadcast.emit("typing", username);
};

export const handleDisconnect = (io, socket) => {
  if (socket.username) {
    onlineUsers.delete(socket.username);
    io.emit("onlineUsers", Array.from(onlineUsers));
    io.emit("notification", `${socket.username} left the chat`);
  }
};
