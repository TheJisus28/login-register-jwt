import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

import { UserModel } from "../models/user.model.js";
import { JWT_SECRET } from "../../../config.js";

// /api/v1/users/register
const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({
        ok: false,
        msg: "Missing required fields: email, pasword,username",
      });
    }

    const user = await UserModel.findeByEmail(email);
    if (user) {
      return res.status(409).json({
        ok: false,
        msg: "Email already in use",
      });
    }

    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);

    const newUser = await UserModel.create({
      email,
      password: hashedPassword,
      username,
    });

    const token = jwt.sign(
      {
        email: newUser.email,
      },
      JWT_SECRET,
      {
        expiresIn: "1h",
      }
    );

    return res.status(201).json({
      ok: true,
      msg: "User created",
      body: token,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      ok: "false",
      msg: "Error server",
    });
  }
};

// /api/v1/users/login
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        ok: true,
        msg: "Missing required fields: email and password",
      });
    }
    const user = await UserModel.findeByEmail(email);

    if (!user) {
      return res.status(404).json({
        ok: true,
        msg: "User don't exists",
      });
    }

    const isMatch = await bcryptjs.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({
        ok: true,
        msg: "Invalid credentials",
      });
    }

    const token = jwt.sign(
      {
        email: user.email,
      },
      JWT_SECRET,
      {
        expiresIn: "1h",
      }
    );

    return res.status(200).json({
      ok: true,
      msg: "User logged",
      body: token,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      ok: false,
      msg: "Error server",
    });
  }
};

// /api/v1/users/profile
const profile = async (req, res) => {
  try {
    console.log("req.email: " + req.email);
    const user = await UserModel.findeByEmail(req.email);

    return res.json({
      ok: true,
      msg: "User data",
      body: user,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ ok: false, msg: "Error server" });
  }
};

const updateUsername = async (req, res) => {
  try {
    const { username: newUsername } = req.body;

    const updatedUser = await UserModel.changeName({
      email: req.email,
      username: newUsername,
    });

    return res.json({
      ok: true,
      msg: "Username updated",
      body: updatedUser,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ ok: false, msg: "Error server" });
  }
};

const updateEmail = async (req, res) => {
  try {
    const { email: newEmail } = req.body;
    console.log("email extraido del req.body: " + newEmail);
    const updatedUser = await UserModel.changeEmail({
      email: req.email,
      newEmail,
    });

    console.log("updatedUser.email: " + updatedUser.email);
    const token = jwt.sign(
      {
        email: updatedUser.email,
      },
      JWT_SECRET,
      {
        expiresIn: "1h",
      }
    );

    return res.json({
      ok: true,
      msg: "User email updated",
      body: updatedUser,
      token,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ ok: false, msg: "Error server" });
  }
};

const updatePassword = async (req, res) => {
  try {
    const { password: newPassword } = req.body;

    const updatedUser = await UserModel.changePassword({
      email: req.email,
      password: newPassword,
    });

    return res.json({
      ok: true,
      msg: "User email updated",
      body: updatedUser,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ ok: false, msg: "Error server" });
  }
};

const deleteUser = async (req, res) => {
  try {
    const deletedUser = await UserModel.deleteUser(req.email);
    return res.json({
      ok: true,
      msg: "User deleted succesfully",
      body: deletedUser,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ ok: false, msg: "Error server" });
  }
};

export const UserController = {
  register,
  login,
  profile,
  updateUsername,
  updateEmail,
  updatePassword,
  deleteUser,
};
