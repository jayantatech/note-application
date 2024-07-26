import { NextFunction, request, Request, Response, Router } from "express";
import { verifyToken } from "../middleware";
import { ExtendedRequest } from "../extended-request";
import supabase from "../supabaseConnection";
import { sanitizeInput } from "../utils/sanitizer";

const router = Router();
interface Note {
  id?: number;
  title: string;
  content: string;
  user_id: string;
  updated_at?: string | null;
}
router.post("/", verifyToken, async (req: ExtendedRequest, res: Response) => {
  const title = sanitizeInput(req.body.title);
  const content = sanitizeInput(req.body.content);
  const user_id = req.user?.userId;
  const { data, error } = await supabase
    .from("Notes")
    .insert({ title, content, user_id })
    .select("*");

  if (error) {
    return res.json(500).json({ message: "something went wrong", error });
  }
  res.status(200).json({ message: "post saved", data });
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

    if (error) {
      return res.json(500).json({ message: "something went wrong", error });
    }

    res.status(200).json({ message: "user deleted successfully", data });
  }
);

router.put(
  "/update/:id",
  verifyToken,
  async (req: ExtendedRequest, res: Response) => {
    const title = sanitizeInput(req.body.title);
    const content = sanitizeInput(req.body.content);
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