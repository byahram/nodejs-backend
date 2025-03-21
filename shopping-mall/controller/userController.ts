import { NextFunction, Request, Response } from "express";
import { connectToDatabase } from "../../db";
import { createUserModal, IUser } from "../model/User";
import mongoose from "mongoose";

export const userController = {
  getUser: async (req: Request, res: Response) => {
    try {
      const db = await connectToDatabase("02-shopping-mall");
      const User = createUserModal(db);

      const userId = (req as any).userId;
      if (!userId) {
        res
          .status(400)
          .json({ status: "fail", message: "userId is required." });
        return;
      }

      if (!mongoose.Types.ObjectId.isValid(userId)) {
        res
          .status(400)
          .json({ status: "fail", message: "Invalid userId format." });
        return;
      }

      const user = await User.findById(userId);
      if (!user) {
        res.status(404).json({ status: "fail", message: "User Not Found." });
        return;
      }

      res.status(200).json({ status: "success", user });
    } catch (error: unknown) {
      res.status(500).json({
        status: "fail",
        error:
          error instanceof Error ? error.message : "An unknown error occurred",
      });
    }
  },
  checkAdminPermission: async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const db = await connectToDatabase("02-shopping-mall");
      const User = createUserModal(db);

      const userId = (req as any).userId;
      const user = await User.findById(userId);
      if (user?.level !== "admin") {
        res.status(403).json({ status: "fail", message: "No Permission" });
        return;
      }
      next();
    } catch (error: unknown) {
      res.status(500).json({
        status: "fail",
        error:
          error instanceof Error ? error.message : "An unknown error occurred",
      });
    }
  },
};
