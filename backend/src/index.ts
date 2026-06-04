import { createServer } from "http";
import app from "./app.js";
import { Server } from "socket.io";
import {
  createUser,
  getUsersByRoom,
  removeUserBySocketId,
} from "./models/userModel.js";
import { env } from "./config/env.js";

const PORT = process.env.PORT || 3000;

const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: env.NODE_ENV === "development" ? "http://localhost:5173" : "/",
  },
});

io.on("connection", (socket) => {
  console.log("A user connected");

  socket.on("join_room", ({ username, roomId }) => {
    socket.join(roomId);

    createUser(username, roomId, socket.id);

    const roomUsers = getUsersByRoom(roomId);
    console.log(`Users in room ${roomId}:`, roomUsers);

    io.to(roomId).emit("room_users", roomUsers);

    socket.broadcast.to(roomId).emit("receive_message", {
      sender: "System",
      text: `${username} joined the room`,
      timestamp: new Date().toLocaleTimeString(),
    });
  });

  // Listen for messages
  socket.on("chatMessage", (data) => {
    const { sender, text, roomId } = data;

    io.to(roomId).emit("receive_message", {
      sender,
      text,
      roomId,
      timestamp: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    });
  });

  socket.on("disconnect", () => {
    const user = removeUserBySocketId(socket.id);

    if (user) {
      const roomUsers = getUsersByRoom(user.roomId);

      io.to(user.roomId).emit("room_users", roomUsers);

      io.to(user.roomId).emit("receive_message", {
        sender: "System",
        text: `${user.username} left the room`,
        timestamp: new Date().toLocaleTimeString(),
      });
    }
  });
});

// Start server
server.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
