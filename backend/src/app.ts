import express from "express";
import usersRoutes from "./routes/userRoutes.js";
import webhooksRoutes from "./routes/webhookRoutes.js";
import cors from "cors";
import { clerkMiddleware } from "@clerk/express";

const app = express();

// Apply middlewares
app.use(express.json());
app.use(clerkMiddleware());
app.use(
  cors({
    origin: "http://localhost:5173", // Adjust this to your frontend's URL
  }),
);

// Register routes
app.use("/api/v1/users", usersRoutes);
app.use("/api/v1/webhooks", webhooksRoutes);

export default app;
