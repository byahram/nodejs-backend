import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const MONGODB_BASE_URI = process.env.MONGODB_BASE_URI as string;
const MONGODB_END_URL = process.env.MONGODB_END_URL as string;

const connections: { [key: string]: mongoose.Connection } = {};

export const connectToDatabase = async (
  dbName: string
): Promise<mongoose.Connection> => {
  const mongoURI = `${MONGODB_BASE_URI}${dbName}?${MONGODB_END_URL}`;

  if (connections[dbName]) {
    console.log(`🔄 Using existing MongoDB connection for ${dbName}`);
    return connections[dbName];
  }

  try {
    const conn = await mongoose.createConnection(mongoURI).asPromise();
    console.log(`✅ Connected to MongoDB: ${dbName}`);
    connections[dbName] = conn;
    return conn;
  } catch (error) {
    console.error(`❌ MongoDB connection error for ${dbName}:`, error);
    throw error;
  }
};
