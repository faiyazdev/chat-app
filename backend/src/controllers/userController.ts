import { Request, Response } from "express";

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
export const registerUser = (req: Request, res: Response): void => {
  const { username, email } = req.body;

  if (!username || !email) {
    res.status(400).json({
      status: "error",
      message: "Username and email are required",
    });
    return;
  }

  // Create the user in memory

  res.status(201).json({
    status: "success",
    message: "User registered successfully",
  });
};
