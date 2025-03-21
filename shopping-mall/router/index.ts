import express from "express";
import { userRouter } from "./userRouter";
import { authRouter } from "./authRouter";
import { productRouter } from "./productRouter";

const router = express.Router();

router.use("/product", productRouter);
router.use("/user", userRouter);
router.use("/auth", authRouter);

export { router as shopRouter };
