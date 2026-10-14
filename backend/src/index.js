import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import http from "http";
import { Server } from "socket.io";

dotenv.config();

const app = express();
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: "*" } });

app.use(cors());
app.use(express.json());

app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

// Tameem: mount /auth, /users, /friends routers here as they're built

io.on("connection", (socket) => {
  console.log(`Socket connected: ${socket.id}`);
});

const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
  console.log(`Backend listening on port ${PORT}`);
});
