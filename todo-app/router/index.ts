import express from "express";
import { router as userRouter } from "./userRouter";
import { router as taskRouter } from "./taskRouter";
// import { router as categoryRouter } from "./categoryRouter";

const router = express.Router();

router.use("/users", userRouter);
router.use("/tasks", taskRouter);
// router.use("/categories", categoryRouter);

export { router as todoRouter };
