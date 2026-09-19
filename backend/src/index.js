import "dotenv/config";
import express from "express";
import cors from "cors";
import { createServer } from "http";
import { Server } from "socket.io";
import { PrismaClient } from "@prisma/client";

const PORT = process.env.PORT || 3001;
const FRONTEND_ORIGIN = process.env.FRONTEND_ORIGIN || "http://localhost:3000";

const app = express();
app.use(cors({ origin: FRONTEND_ORIGIN }));
app.use(express.json());

const prisma = new PrismaClient();

// --- Health check (also used by docker-compose's healthcheck) ---
app.get("/health", async (req, res) => {
  try {
    await prisma.$queryRaw`SELECT 1`;
    res.json({ status: "ok", db: "connected" });
  } catch (err) {
    res.status(503).json({ status: "degraded", db: "unreachable" });
  }
});

// TODO: mount real routers here as you build them, e.g.
// app.use("/api/auth", authRouter);
// app.use("/api/tracks", tracksRouter);   <- or your actual game/user routes

const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: { origin: FRONTEND_ORIGIN },
});

io.on("connection", (socket) => {
  console.log(`socket connected: ${socket.id}`);

  socket.on("disconnect", () => {
    console.log(`socket disconnected: ${socket.id}`);
  });

  // TODO: real-time game/chat events go here
});

httpServer.listen(PORT, () => {
  console.log(`Backend listening on port ${PORT}`);
});
