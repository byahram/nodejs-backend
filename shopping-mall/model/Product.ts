import mongoose, { Connection, Document, Model, Schema } from "mongoose";

export interface IProduct extends Document {
  sku: string;
  name: string;
  size: string[];
  thumbnail: string;
  detailImages: string[];
  category: string[];
  description: string;
  price: number;
  stock: Record<string, any>;
  status?: string;
  isDeleted?: boolean;
}

export const createProductModel = (db: Connection): Model<IProduct> => {
  if (db.models.Product) {
    return db.models.Product as Model<IProduct>;
  }

  const productSchema: Schema<IProduct> = new Schema(
    {
      sku: { type: String, required: true, unique: true },
      name: { type: String, required: true },
      size: { type: [String], required: true },
      thumbnail: { type: String, required: true },
      detailImages: { type: [String] },
      category: { type: [String], required: true },
      description: { type: String, required: true },
      price: { type: Number, required: true },
      stock: { type: Object, required: true },
      status: { type: String, default: "active" },
      isDeleted: { type: Boolean, default: false },
    },
    { timestamps: true }
  );

  productSchema.methods.toJSON = function () {
    const obj = this.toObject();
    delete obj.__v;
    delete obj.createdAt;
    delete obj.updatedAt;
    return obj;
  };

  return db.model<IProduct>("Product", productSchema);
};
