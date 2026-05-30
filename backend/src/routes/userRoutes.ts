import { Router } from "express";
import { getUsers, registerUser } from "../controllers/userController.js";

const router = Router();

// User routes
router.get("/", getUsers);
router.post("/register", registerUser);

export default router;
