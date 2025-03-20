import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;

if (!JWT_SECRET_KEY) {
  throw new Error("JWT secret key is not defined in environment variables");
}

export const authController = {
  authenticate: (req: Request, res: Response, next: NextFunction): void => {
    try {
      const tokenString = req.headers.authorization;
      if (!tokenString) {
        res
          .status(401)
          .json({ status: "fail", message: "Unauthorized: No token provided" });
        return;
      }

      const token = tokenString.replace("Bearer ", "");
      jwt.verify(token, JWT_SECRET_KEY, (error, payload) => {
        if (
          error ||
          !payload ||
          typeof payload !== "object" ||
          !("_id" in payload)
        ) {
          res
            .status(401)
            .json({ status: "fail", message: "Unauthorized: Invalid token" });
          return;
        }

        (req as any).userId = payload._id as string;

        next();
      });
    } catch (error) {
      res.status(500).json({
        status: "fail",
        error:
          error instanceof Error ? error.message : "An unknown error occurred",
      });
      return;
    }
  },
};
