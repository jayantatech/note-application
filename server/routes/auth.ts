import { Router } from "express";

const router = Router();

router.get("/working", async (req, res) => {
  return res.json({ code: "it is working" });
});

export default router;
