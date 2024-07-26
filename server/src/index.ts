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

const csrfProtection = csurf({ cookie: true });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.use(csrfProtection);

app.use("/api/auth", authRoutes);
app.use("/api/notes", noteRoutes);

app.get("/api/csrf-token", (req, res) => {
  res.json({ csrfToken: req.csrfToken() });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
