import { getAuth } from "@clerk/express";
import { Request, Response, NextFunction } from "express";

export const requireAuth = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { userId: clerkId } = getAuth(req);

  if (!clerkId) {
    return res.status(401).json({
      error: "Unauthorized",
    });
  }

  req.clerkId = clerkId;

  next();
};
