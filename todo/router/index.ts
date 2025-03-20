import express from "express";
import { router as userRouter } from "./userRouter";
// import { router as categoryRouter } from "./categoryRouter";
// import { router as taskRouter } from "./taskRouter";

const router = express.Router();

router.use("/users", userRouter);
// router.use("/categories", categoryRouter);
// router.use("/tasks", taskRouter);

export { router };
