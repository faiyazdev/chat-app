import { Router } from "express";
import express from "express";
import { clerkWebhook } from "../controllers/webhookController.js";

const router = Router();

// User routes
router.post("/clerk", express.raw({ type: "application/json" }), clerkWebhook);

export default router;
