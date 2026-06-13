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
  const currentUserId = await getUserIdByClerkId(req.clerkId!);
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
  const senderId = await getUserIdByClerkId(req.clerkId!);
  const receiverId = await getUserIdByClerkId(req.params.clerkUserId);
  console.log(senderId, receiverId);
  const { text, image } = req.body;

  const newMessage = await createMessage({ senderId, receiverId, text, image });
  res.status(201).json({
    status: "success",
    data: {
      message: newMessage,
    },
  });
};
