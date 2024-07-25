import { NextFunction, request, Request, Response, Router } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { verifyToken } from "../middleware";
import { ExtendedRequest } from "../extended-request";
import supabase from "../supabaseConnection";
const router = Router();
interface Note {
  id?: number;
  title: string;
  content: string;
  user_id: string;
  updated_at?: string | null; // Adjust data type as needed
}
router.post("/", verifyToken, async (req: ExtendedRequest, res: Response) => {
  const { title, content } = req.body;
  const user_id = req.user?.userId;
  const { data, error } = await supabase
    .from("Notes")
    .insert({ title, content, user_id });
});

router.get("/", verifyToken, async (req: ExtendedRequest, res: Response) => {
  const user_id = req.user?.userId;
  const { data, error } = await supabase
    .from("Notes")
    .select("*")
    .eq("user_id", user_id);

  if (error) res.status(500).json({ message: "something is not ok", error });

  res.status(201).json(data);
});

router.delete(
  "/remove/:id",
  verifyToken,
  async (req: ExtendedRequest, res: Response) => {
    const { id } = req.params;
    const user_id = req.user?.userId;
    const { data, error } = await supabase
      .from("Notes")
      .delete()
      .eq("user_id", user_id)
      .eq("id", id)
      .select();

    if (error) res.json(500).json({ message: "something went wrong", error });

    res.status(200).json({ message: "user deleted successfully", data });
  }
);

router.put(
  "/update/:id",
  verifyToken,
  async (req: ExtendedRequest, res: Response) => {
    const { title, content } = req.body;
    const { id } = req.params;
    const user_id = req.user?.userId;
    const { data, error } = await supabase
      .from("Notes")
      .update({ title, content })
      .eq("user_id", user_id)
      .eq("id", id)
      .select("*");

    if (error) res.json(500).json({ message: "something went wrong", error });

    res.status(200).json({ message: " Note updated successfully", data });
  }
);

export default router;
