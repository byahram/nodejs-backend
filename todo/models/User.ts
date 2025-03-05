import mongoose from "mongoose";

const Schema = mongoose.Schema;

// 스키마 정의
const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

userSchema.methods.toJSON = function () {
  const obj = this._doc;
  delete obj.password;
  delete obj.updateAt;
  delete obj._v;
  return obj;
};

// 모델 생성
const User = mongoose.model("User", userSchema);

// 모듈 export
module.exports = User;
