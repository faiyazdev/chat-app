import { Request, Response } from "express";
import { getUserIdByClerkId } from "../services/user.service.js";

export const handleGetUsers = (req: Request, res: Response): void => {
  res.json({
    status: "success",
  });
};
export const handleGetUserIdByClerkId = async (req: Request, res: Response) => {
  const { clerkUserId } = req.params;
  const userId = await getUserIdByClerkId(clerkUserId);
  res.json({
    status: "success",
    data: {
      userId,
    },
  });
};
