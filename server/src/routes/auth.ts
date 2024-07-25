import { createClient } from "@supabase/supabase-js";
import { Request, Response, Router } from "express";
import jwt from "jsonwebtoken";
import { verifyToken } from "../middleware";
import { ExtendedRequest } from "../extended-request";

const router = Router();
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
    const { email, password } = req.body;
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) res.json({ message: "something went wrong", error });

    const { data: dbData, error: dbError } = await supabase
      .from("Users")
      .select("*")
      .eq("id", data.user?.id);
    if (dbError) res.json({ message: "something went wrong", dbData });

    // const token = data.session.access_token;
    if (!dbData) throw error;
    const user_Id = data.user?.id;
    const user_role = dbData[0].role;
    const user_name = dbData[0].name;
    const token = generateToken(user_Id!, user_role, user_name);
    console.log("This si the token", token);
    res.cookie("token", token, { httpOnly: true, secure: true });

    res.status(200).json({
      token,
      user: data.user,
      message: "user logged in successfully ",
    });
  } catch (error) {
    res.status(500).json({ message: "login failed", error });
  }
});

router.post("/signup", async (req: Request, res: Response) => {
  try {
    const { email, password, role, name } = req.body;
    const { data, error } = await supabaseAdmin.auth.admin.createUser({
      email,
      password,
      email_confirm: true,
    });

    if (error) throw error;

    if (!data) res.status(201).json({ message: "something is wrong" });
    const { data: dbData, error: dbError } = await supabase
      .from("Users")
      .insert([{ id: data.user?.id, email, role, name }]);

    if (dbError) return res.status(400).send(dbError.message);
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
      if (error)
        res.status(500).json({ message: "Something went wrong", error });

      res.status(200).json({ message: "User signed out successfully" });
    } catch (error) {
      res.status(500).json({ message: "Something went wrong", error });
    }
  }
);
export default router;
