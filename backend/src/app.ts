import express from "express";
import usersRoutes from "./routes/userRoutes.js";
import webhooksRoutes from "./routes/webhookRoutes.js";
import { clerkMiddleware } from "@clerk/express";
import path from "path";
import { env } from "./config/env.js";

const app = express();

// Apply middlewares
app.use(express.json());
app.use(clerkMiddleware());

// Register routes
app.use("/api/v1/users", usersRoutes);
app.use("/api/v1/webhooks", webhooksRoutes);

if (env.NODE_ENV === "production") {
  const frontendPath = path.join(process.cwd(), "frontend", "dist");
  app.use(express.static(frontendPath));
  app.get("*", (req, res) => {
    res.sendFile(path.join(frontendPath, "index.html"));
  });
}

export default app;
