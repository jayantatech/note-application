import dotenv from "dotenv";
dotenv.config();
import express, { Request, Response } from "express";
import bodyParser from "body-parser";
import cors from "cors";
import authRoutes from "./routes/auth";
import noteRoutes from "./routes/notes";
import cookieParser from "cookie-parser";
// import csurf from "csurf";
import { doubleCsrf } from "csrf-csrf";

const app = express();
const PORT = process.env.PORT || 4000;

const { doubleCsrfProtection, generateToken } = doubleCsrf({
  getSecret: () => process.env.CSRF_SECRET!,
  cookieName: "__Host-csrf-token",
  cookieOptions: {
    sameSite: "none",
    secure: process.env.NODE_ENV === "production",
  },
});
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  cors({
    origin: process.env.FRONTEND_URL!,
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
app.use(doubleCsrfProtection);

app.get("/api/csrf-token", (req, res) => {
  const csrfToken = generateToken(req, res); // Generate CSRF token
  res.json({ csrfToken }); // Send token to client
});

app.use("/api/auth", authRoutes);
app.use("/api/notes", noteRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
