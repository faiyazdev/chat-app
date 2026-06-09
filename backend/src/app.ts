import express from "express";
import usersRoutes from "./routes/user.route.js";
import messagesRoutes from "./routes/message.route.js";
import webhooksRoutes from "./routes/webhook.route.js";
import { clerkMiddleware } from "@clerk/express";
import path from "path";
import { fileURLToPath } from "url";
import { env } from "./config/env.js";
import cors from "cors";

const app = express();

// Apply middlewares
app.use(express.json());
app.use(clerkMiddleware());
app.use(
  cors({
    origin: ["http://localhost:5173"],
    credentials: true, // Allow cookies
  }),
);

// Register routes
app.use("/api/v1/users", usersRoutes);
app.use("/api/v1/messages", messagesRoutes);
app.use("/api/v1/webhooks", webhooksRoutes);

if (env.NODE_ENV === "production") {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);
  // Compiled file is at backend/dist/src/app.js, so we need to go up three levels
  // (src -> dist -> backend -> root) to find frontend/dist
  const frontendPath = path.resolve(__dirname, "../../../frontend/dist");
  app.use(express.static(frontendPath));
  app.get("*", (req, res) => {
    res.sendFile(path.join(frontendPath, "index.html"));
  });
}

export default app;
