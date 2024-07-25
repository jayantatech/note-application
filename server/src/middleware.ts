import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { ExtendedRequest } from "./extended-request";
const SUPABASE_JWT_SECRET = process.env.SUPABASE_JWT_SECRET!;

export const verifyToken = (
  req: ExtendedRequest,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ message: "No token provided" });

  try {
    const decode = jwt.verify(token, SUPABASE_JWT_SECRET) as {
      userId: string;
      role: string;
      name: string;
    };
    req.user = decode;
    next();
  } catch (error) {
    res.status(401).json({ message: "Invalid token" });
  }
};
