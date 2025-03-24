import mongoose, { Connection, Document, Model, Schema } from "mongoose";

// User 인터페이스 정의
export interface ITask extends Document {
  task: string;
  isComplete: Boolean;
  user: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

export const createTaskModel = (db: Connection): Model<ITask> => {
  if (db.models.Task) {
    return db.models.Task as Model<ITask>;
  }

  // 스키마 정의
  const taskSchema: Schema<ITask> = new Schema(
    {
      task: {
        type: String,
        required: true,
      },
      isComplete: {
        type: Boolean,
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

  // 모델 생성 및 Export
  return db.model<ITask>("Task", taskSchema);
};
