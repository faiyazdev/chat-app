import { Server } from "socket.io";
import { createServer } from "http";
import app from "../app.js";
import { env } from "../config/env.js";

export const server = createServer(app);

const io = new Server(server, {
  cors: {
    origin: env.NODE_ENV === "development" ? "http://localhost:5173" : "/",
  },
});

io.on("connection", (socket) => {
  console.log("A user connected:", socket.id);

  socket.on("disconnect", () => {
    console.log("A user disconnected:", socket.id);
  });
});
