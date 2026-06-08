import { Router } from "express";
import { handleGetUsers } from "../controllers/user.controller.js";
import { requireAuth } from "../middlewares/requireAuth.js";

const router = Router();

// User routes
router.get("/", requireAuth, handleGetUsers);

export default router;
