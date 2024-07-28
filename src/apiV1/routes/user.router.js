import { Router } from "express";
import { UserController } from "../controllers/user.controller.js";
import { verifyToken } from "../middelwares/jwt.middelware.js";

const router = Router();

router
  .post("/register", UserController.register)
  .post("/login", UserController.login)
  .get("/profile", verifyToken, UserController.profile)
  .patch("/name", verifyToken, UserController.updateUsername);

export default router;
