import { Request, Response, RequestHandler } from "express";
import { connectToDatabase } from "../../db";
import { createTaskModel, ITask } from "../model/Task";

export const taskController = {
  getTasks: (async (req: Request, res: Response) => {
    try {
      const db = await connectToDatabase("01-todo-app");
      const Task = createTaskModel(db);

      const tasks = await Task.find({}).select("-__v").populate("user");

      res.status(200).json({ status: "success", data: tasks });
    } catch (error: unknown) {
      res.status(500).json({
        status: "fail",
        error:
          error instanceof Error ? error.message : "An unknown error occurred",
      });
    }
  }) as RequestHandler,
  addTask: async (req: Request, res: Response) => {
    try {
      const db = await connectToDatabase("01-todo-app");
      const Task = createTaskModel(db);

      const { task, isComplete } = req.body;
      const userId = (req as any).userId;

      const newTask: ITask = new Task({
        task,
        isComplete,
        user: userId,
      });
      await newTask.save();

      res.status(201).json({ status: "success", data: newTask });
    } catch (error: unknown) {
      res.status(500).json({
        status: "fail",
        error:
          error instanceof Error ? error.message : "An unknown error occurred",
      });
    }
  },
  updateTask: async (req: Request, res: Response) => {
    try {
      const db = await connectToDatabase("01-todo-app");
      const Task = createTaskModel(db);

      const updateTask = await Task.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
      });

      if (!updateTask) {
        res.status(404).json({
          status: "fail",
          message: `Task("${req.params.id}") not found or unauthorized`,
        });
      }

      res.status(200).json({ status: "success", data: updateTask });
    } catch (error: unknown) {
      res.status(500).json({
        status: "fail",
        error:
          error instanceof Error ? error.message : "An unknown error occurred",
      });
    }
  },
  deleteTask: (async (req: Request, res: Response) => {
    try {
      const db = await connectToDatabase("01-todo-app");
      const Task = createTaskModel(db);

      const deleteTask = await Task.findByIdAndDelete(req.params.id);

      if (!deleteTask)
        throw new Error(`Could not delete the task "${req.params.id}"`);

      res.status(200).json({ status: "success", data: deleteTask });
    } catch (error: unknown) {
      res.status(500).json({
        status: "fail",
        error:
          error instanceof Error ? error.message : "An unknown error occurred",
      });
    }
  }) as RequestHandler,
};
