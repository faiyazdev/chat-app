import { clerkClient } from "@clerk/express";
import { Request, Response } from "express";
import db from "../db/index.js";
import { usersTable } from "../db/schema.js";

/**
 * Handle listing all users
 */
export const getUsers = (req: Request, res: Response): void => {
  res.json({
    status: "success",
  });
};

/**
 * Handle user registration
 */
export const registerUser = async (req: Request, res: Response) => {
  const { clerkId } = req.user;

  const user = await clerkClient.users.getUser(clerkId!);
  // Create the user in memory

  try {
    const newUser = await db.insert(usersTable).values({
      name: user.firstName + " " + user.lastName,
      email: user.emailAddresses[0].emailAddress,
      profilePicture: user.imageUrl,
      clerkUserId: user.id,
    });
  } catch (error) {
    console.error("Error registering user:", error);
    return res.status(500).json({
      status: "error",
      message: "Failed to register user",
    });
  }

  res.status(201).json({
    status: "success",
    message: "User registered successfully",
    data: {
      user,
    },
  });
};
