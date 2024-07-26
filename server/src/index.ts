import dotenv from "dotenv";
dotenv.config();
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import authRoutes from "./routes/auth";
import noteRoutes from "./routes/notes";
import cookieParser from "cookie-parser";
import csurf from "csurf";

const app = express();
const PORT = process.env.PORT || 4000;

const csrfProtection = csurf({
  cookie: {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "none",
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

app.use(csrfProtection);

app.use("/api/auth", authRoutes);
app.use("/api/notes", noteRoutes);

app.get("/api/csrf-token", (req, res) => {
  res.json({ csrfToken: req.csrfToken() });
});

app.get("/api/check-third-party-cookies", (req, res) => {
  res.cookie("third-party-test", "test", { sameSite: "none", secure: true });
  if (req.cookies["third-party-test"]) {
    res.status(200).send("Third-party cookies are enabled");
  } else {
    res.status(400).send("Third-party cookies are disabled");
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
