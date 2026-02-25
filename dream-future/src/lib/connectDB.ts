import mongoose from "mongoose";

let isConnectedDB = false;
const URI = process.env.MONGODB_URI as string;

const connectDB = async () => {
  if (isConnectedDB) return;

  try {
    await mongoose.connect(URI, { dbName: "Dream-Future" });
    isConnectedDB = true;
  } catch (error) {
    console.error("DB connection error!, the error is:", error);
  }
};

export default connectDB;
