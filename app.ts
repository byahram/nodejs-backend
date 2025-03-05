import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";

import { router as todoRouter } from "./todo/routes/index";

dotenv.config();

const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json()); // req.body가 객체로 인식이 됨

// DB 연결 URL
const todoMongoURI = process.env.TODO_APP_DB_URI || "";
const shoppingMongoURI = process.env.SHOPPING_MALL_DB_URI || "";

// MongoDB 연결 함수
const connectToDatabase = async (dbURI: string): Promise<void> => {
  try {
    await mongoose.connect(dbURI);
    console.log("✅ Connected to DB");
  } catch (err) {
    console.error("❌ DB connection error:", err);
  }
};

// DB 연결 (Todo와 Shopping을 각각 연결)
const connectToTodoDB = () => connectToDatabase(todoMongoURI);
const connectToShoppingDB = () => connectToDatabase(shoppingMongoURI);

// 라우터 설정
app.use("/api/todo", todoRouter);
// app.use("/api/shopping", shoppingRoutes);

app.listen(process.env.PORT || 5000, () => {
  console.log(`🚀 Server running on port ${process.env.PORT}`);
});
