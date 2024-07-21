import bodyParser from "body-parser";
import express from "express";
import next from "next";
import authRoutes from "./routes/auth";

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();
const port = process.env.PORT || 3000;

app.prepare().then(() => {
  const server = express();

  server.use(bodyParser.json());
  server.use("/api/auth", authRoutes);

  server.all("*", (req, res) => {
    return handle(req, res);
  });

  server.listen(port, (err?: any) => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${port}`);
  });
});
