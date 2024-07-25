import { createClient } from "@supabase/supabase-js";
import { Request, Response, Router } from "express";
import jwt from "jsonwebtoken";
import { verifyToken } from "../middleware";
import { ExtendedRequest } from "../extended-request";
import { sanitizeInput } from "../utils/sanitizer";
import csurf from "csurf";

const router = Router();
// const csrfProtection = csurf({ cookie: true });

const SUPABASE_URL = process.env.SUPABASE_URL!;
const SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY!;
const SUPABASE_JWT_SECRET = process.env.SUPABASE_JWT_SECRET!;

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
const supabaseAdmin = createClient(
  SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

const generateToken = (userId: string, role: string, name: string) => {
  return jwt.sign({ userId, role, name }, SUPABASE_JWT_SECRET, {
    expiresIn: "1d",
  });
};

router.post("/login", async (req: Request, res: Response) => {
  try {
    const email = sanitizeInput(req.body.email);
    const password = sanitizeInput(req.body.password);
    console.log("email", email, "password", password);
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      return res.status(500).json({ message: "something went wrong", error });
    }

    const { data: dbData, error: dbError } = await supabase
      .from("Users")
      .select("*")
      .eq("id", data.user?.id);

    if (dbError) {
      return res.status(500).json({ message: "something went wrong", dbError });
    }
    // const token = data.session.access_token;
    if (!dbData) throw error;
    const user_Id = data.user?.id;
    const user_role = dbData[0].role;
    const user_name = dbData[0].name;
    const token = generateToken(user_Id!, user_role, user_name);
    // res.cookie("token", token, { httpOnly: true, secure: true });

    res.status(200).json({
      token,
      user: data.user,
      message: "user logged in successfully ",
    });
  } catch (error) {
    if (error) {
      return res.status(500).json({ message: "something went wrong", error });
    }
  }
});

router.post("/signup", async (req: Request, res: Response) => {
  try {
    const email = sanitizeInput(req.body.email);
    const password = sanitizeInput(req.body.password);
    const name = sanitizeInput(req.body.name);
    const role = sanitizeInput(req.body.role);
    const { data, error } = await supabaseAdmin.auth.admin.createUser({
      email,
      password,
      email_confirm: true,
    });

    if (error) {
      return res.status(500).json({ message: "something went wrong", error });
    }
    if (!data) res.status(201).json({ message: "something is wrong" });
    const { data: dbData, error: dbError } = await supabase
      .from("Users")
      .insert([{ id: data.user?.id, email, role, name }]);

    if (dbError) {
      return res.status(500).json({ message: "something went wrong", dbError });
    }
    res
      .status(201)
      .json({ user: data.user, message: "user created successfully" });
  } catch (error) {
    res.status(500).json({ message: "signup failed", error });
  }
});

router.post(
  "/signout",
  verifyToken,
  async (req: ExtendedRequest, res: Response) => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) {
        return res.status(500).json({ message: "something went wrong", error });
      }
      res.status(200).json({ message: "User signed out successfully" });
    } catch (error) {
      if (error) {
        return res.status(500).json({ message: "something went wrong", error });
      }
    }
  }
);
export default router;
