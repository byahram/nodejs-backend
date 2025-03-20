import express from "express";
import { productRouter } from "./productRouter";

const router = express.Router();

router.use("/product", productRouter);

export { router };
