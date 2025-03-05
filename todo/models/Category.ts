import mongoose from "mongoose";

const Schema = mongoose.Schema;

// 스키마 정의
const categorySchema = new Schema(
  {
    category: {
      type: String,
      required: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
  },
  { timestamps: true }
);

// 모델 생성
const Category = mongoose.model("Category", categorySchema);

// 모듈 export
module.exports = Category;
