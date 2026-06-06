import { Router } from "express";
import { requireAuth } from "../middlewares/requireAuth.js";
import {
  handleGetMessagesBetweenTwoUsers,
  handleCreateMessage,
} from "../controllers/message.controller.js";

const router = Router();

router
  .route("/chat/targetUser/:clerkUserId")
  .get(requireAuth, handleGetMessagesBetweenTwoUsers)
  .post(requireAuth, handleCreateMessage);

export default router;
