import { server } from "./lib/socket.js";

const PORT = process.env.PORT || 3000;

// Start server
server.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
