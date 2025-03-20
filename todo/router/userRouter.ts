import express from "express";
import { userController } from "../controller/userController";
import { authController } from "../controller/authController";

const router = express.Router();

router.post("/register", userController.register);
router.post("/login", userController.loginWithEmail);
router.get("/getUser", authController.authenticate, userController.getUser);

export { router };
