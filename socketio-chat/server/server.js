// server/server.js
import express from "express";
import http from "http";
import cors from "cors";
import { Server } from "socket.io";
import { socketHandler } from "./socket/socketHandler.js";
import corsConfig from "./config/corsConfig.js";

const app = express();
app.use(cors(corsConfig));
app.use(express.json());

const server = http.createServer(app);

const io = new Server(server, {
  cors: corsConfig,
});

// Initialize socket.io handlers
socketHandler(io);

app.get("/", (req, res) => {
  res.send("✅ Socket.io Chat Server Running");
});

const PORT = 5000;
server.listen(PORT, () =>
  console.log(`🚀 Server running on http://localhost:${PORT}`)
);
