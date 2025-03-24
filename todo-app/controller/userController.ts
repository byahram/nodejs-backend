import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import mongoose from "mongoose";
import { connectToDatabase } from "../../db";
import { createUserModal } from "../../shopping-mall/model/User";

const saltRounds = 10;

export const userController = {
  // 회원가입 (register)
  register: async (req: Request, res: Response) => {
    try {
      const db = await connectToDatabase("01-todo-app");
      const User = createUserModal(db);

      const { name, email, password } = req.body;

      // User가 존재하는지 Check
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        res
          .status(400)
          .json({ status: "fail", message: "User already registered." });
        return;
      }

      const salt = bcrypt.genSaltSync(saltRounds);
      const hash = bcrypt.hashSync(password, salt);
      const newUser = new User({ email, name, password: hash });
      await newUser.save();

      res
        .status(200)
        .json({ status: "success", message: "Registration successful!" });
      return;
    } catch (error: unknown) {
      res.status(500).json({
        status: "fail",
        error:
          error instanceof Error ? error.message : "An unknown error occurred",
      });
      return;
    }
  },
  // 로그인 (loginWithEmail)
  loginWithEmail: async (req: Request, res: Response) => {
    try {
      const db = await connectToDatabase("01-todo-app");
      const User = createUserModal(db);

      const { email, password } = req.body;

      const user = await User.findOne({ email }).select(
        "-createdAt -updatedAt -__v"
      );

      if (!user) {
        // 사용자가 없을 때
        res.status(404).json({ status: "fail", message: "User not found." });
        return;
      } else {
        // 사용자가 있을 때 비밀번호 일치 여부
        const isMatch = await bcrypt.compareSync(password, user.password);

        if (!isMatch) {
          res
            .status(400)
            .json({ status: "fail", message: "Incorrect password." });
          return;
        }

        const token = user.generateToken();
        res.status(200).json({ status: "success", user, token });
        return;
      }
    } catch (error: unknown) {
      res.status(500).json({
        status: "fail",
        error:
          error instanceof Error ? error.message : "An unknown error occurred",
      });
      return;
    }
  },
  // 유저 정보 가져오기 (getUser)
  getUser: async (req: Request, res: Response) => {
    try {
      const db = await connectToDatabase("01-todo-app");
      const User = createUserModal(db);

      const userId = (req as any).userId;
      if (!userId) {
        res.status(400).json({
          status: "fail",
          message: "userId is required.",
        });
        return;
      }

      if (!mongoose.Types.ObjectId.isValid(userId)) {
        res.status(400).json({
          status: "fail",
          message: "Invalid userId format.",
        });
        return;
      }

      const user = await User.findById(userId);
      if (!user) {
        res.status(404).json({
          status: "fail",
          message: "User not found.",
        });
        return;
      }

      res.status(200).json({ status: "success", user });
      return;
    } catch (error: unknown) {
      res.status(500).json({
        status: "fail",
        error:
          error instanceof Error ? error.message : "An unknown error occurred",
      });
      return;
    }
  },
};
