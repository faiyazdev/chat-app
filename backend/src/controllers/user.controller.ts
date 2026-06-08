import { Request, Response } from "express";
import { getUserIdByClerkId, getUsers } from "../services/user.service.js";

export const handleGetUsers = async (req: Request, res: Response) => {
  const users = await getUsers(req.user.clerkId!);
  res.json({
    status: "success",
    data: {
      users,
    },
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
