import { Request } from "express";

export interface ExtendedRequest extends Request {
  user?: { userId: string; role: string; name?: string };
}
