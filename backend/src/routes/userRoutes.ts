import { Router } from "express";
import { getUsers, registerUser } from "../controllers/userController.js";
import { requireAuth } from "../middlewares/requireAuth.js";

const router = Router();

// User routes
router.get("/", getUsers);
router.post("/register", requireAuth, registerUser);

export default router;
