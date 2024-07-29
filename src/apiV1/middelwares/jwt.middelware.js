import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../../../config.js";

export const verifyToken = (req, res, next) => {
  let token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({
      ok: true,
      msg: "Token not provided",
    });
  }

  token = token.split(" ")[1];

  try {
    const { email } = jwt.verify(token, JWT_SECRET);
    console.log("email sacado del token: " + email);
    req.email = email;
    next();
  } catch (err) {
    console.log(err);
    return res.status(400).json({
      ok: true,
      msg: "Invalid token",
    });
  }
};
