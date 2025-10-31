// server/socket/socketHandler.js
import {
  handleJoin,
  handleMessage,
  handleTyping,
  handleDisconnect,
} from "../controllers/chatController.js";

export const socketHandler = (io) => {
  io.on("connection", (socket) => {
    console.log("🟢 User connected:", socket.id);

    socket.on("join", (username) => handleJoin(io, socket, username));

    socket.on("sendMessage", (msg) => handleMessage(io, socket, msg));

    socket.on("typing", (username) => handleTyping(socket, username));

    socket.on("disconnect", () => handleDisconnect(io, socket));
  });
};
