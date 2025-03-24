import express from "express";
import { authController } from "../controller/authController";
import { taskController } from "../controller/taskController";

const router = express.Router();

router.get("/getAll", taskController.getTasks);
router.post("/add", authController.authenticate, taskController.addTask);
router.put("/update/:id", taskController.updateTask);
router.delete("/delete/:id", taskController.deleteTask);

export { router };
