import express from "express";
import { authRouter } from "./authRouter";
import { productRouter } from "./productRouter";

const router = express.Router();

router.use("/product", productRouter);
router.use("/auth", authRouter);

export { router };
