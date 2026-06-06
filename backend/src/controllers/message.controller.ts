import { Request, Response } from "express";
import {
  createMessage,
  getMessagesBetweenTwoUsers,
} from "../services/message.service.js";
import { getUserIdByClerkId } from "../services/user.service.js";

export const handleGetMessagesBetweenTwoUsers = async (
  req: Request,
  res: Response,
) => {
  const currentUserId = req.user?.id!;
  const otherUserId = await getUserIdByClerkId(req.params.clerkUserId);
  const messages = await getMessagesBetweenTwoUsers(currentUserId, otherUserId);

  res.json({
    status: "success",
    data: {
      messages,
    },
  });
};

export const handleCreateMessage = async (req: Request, res: Response) => {
  const senderId = req.user?.id!;
  const receiverId = await getUserIdByClerkId(req.params.clerkUserId);
  const { text, image } = req.body;

  const newMessage = createMessage({ senderId, receiverId, text, image });
  res.status(201).json({
    status: "success",
    data: {
      message: newMessage,
    },
  });
};
