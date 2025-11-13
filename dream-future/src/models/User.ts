import { IUser } from "@/types";
import mongoose, { Schema } from "mongoose";

const userSchema = new Schema<IUser>(
  {
    firstName: {
      type: String,
      trim: true,
      maxlength: [60, "Name can't be more than 60 characters."],
      required: [true, "Please provide a name."],
    },
    lastName: {
      type: String,
      trim: true,
      maxlength: [60, "Name can't be more than 60 characters."],
    },
    username: { type: String, trim: true, unique: true },
    email: {
      type: String,
      trim: true,
      unique: true,
      lowercase: true,
      required: [true, "Please provide a email."],
    },
    phone: { type: String, trim: true },
    password: { type: String },
    gender: { type: String, enum: ["Male", "Female", "Other"] },
    avatar: { type: String, default: "" },
    birthday: Date,
    address: String,
    stone: { type: Number, default: 0 },
    role: {
      type: String,
      enum: ["member", "treasurer", "admin"],
      default: "member",
    },
    blood: {
      type: String,
      enum: ["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-", ""],
      default: "",
    },
    nationality: String,
    diposite: { type: Number, default: 0 },
    profit: { type: Number, default: 0 },
  },
  {
    timestamps: true,
  }
);

// const User = mongoose.model("User", userSchema);
const User = mongoose.models.User || mongoose.model<IUser>("User", userSchema);
export default User;
