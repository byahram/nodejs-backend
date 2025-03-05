import mongoose from "mongoose";

const Schema = mongoose.Schema;

// 스키마 정의
const taskSchema = new Schema(
  {
    task: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
    },
    category: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "Category",
    },
    author: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
  },
  { timestamps: true }
);

// 모델 생성
const Task = mongoose.model("Task", taskSchema);

// 모듈 export
module.exports = Task;
