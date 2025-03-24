import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import morgan from "morgan";

import { shopRouter } from "./shopping-mall/router/index";
import { todoRouter } from "./todo-app/router/index";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(morgan("dev"));

// API 라우터
app.use("/api/shop", shopRouter);
app.use("/api/todo", todoRouter);

// 404 예외 처리
app.use((req, res) => {
  res.status(404).json({ error: "Not Found" });
});

// 서버 실행
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
