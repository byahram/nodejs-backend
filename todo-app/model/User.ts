import mongoose, { Connection, Document, Model, Schema } from "mongoose";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY as string;

// User 인터페이스 정의
interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  generateToken(): string;
}

export const createUserModel = (db: Connection): Model<IUser> => {
  if (db.models.User) {
    return db.models.User as Model<IUser>;
  }

  // 스키마 정의
  const userSchema: Schema<IUser> = new Schema(
    {
      name: {
        type: String,
        required: true,
      },
      email: {
        type: String,
        required: true,
        unique: true,
      },
      password: {
        type: String,
        required: true,
      },
    },
    { timestamps: true }
  );

  // 비밀번호 숨기기
  userSchema.methods.toJSON = function () {
    const obj = this.toObject();
    delete obj.password;
    delete obj.updateAt;
    delete obj._v;
    return obj;
  };

  // 토큰 생성
  userSchema.methods.generateToken = function (): string {
    const token = jwt.sign({ _id: this._id }, JWT_SECRET_KEY, {
      expiresIn: "1d",
    });
    return token;
  };

  // 모델 생성 및 Export
  return db.model<IUser>("User", userSchema);
};
