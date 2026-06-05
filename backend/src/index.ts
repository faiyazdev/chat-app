import { createServer } from "http";
import app from "./app.js";
import { Server } from "socket.io";

import { env } from "./config/env.js";

const PORT = process.env.PORT || 3000;

const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: env.NODE_ENV === "development" ? "http://localhost:5173" : "/",
  },
});

// Start server
server.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
