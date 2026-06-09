export {};

declare global {
  namespace Express {
    interface Request {
      clerkId?: string;
    }
  }
}
