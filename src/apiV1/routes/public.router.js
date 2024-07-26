import { Router } from "express";
import path from "path";
import { fileURLToPath } from "url";
const router = Router();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const publicPath = path.join(__dirname, "../../public");

router
  .get("/login", (req, res) => {
    res.sendFile(publicPath + "/login.html");
  })
  .get("/profile", (req, res) => {
    res.sendFile(publicPath + "/profile.html");
  })
  .get("/register", (req, res) => {
    res.sendFile(publicPath + "/register.html");
  });

export default router;
