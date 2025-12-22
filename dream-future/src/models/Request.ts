import { IRequest } from "@/types";
import mongoose, { Schema } from "mongoose";

const requestSchema = new Schema<IRequest>(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    accountId: { type: Schema.Types.ObjectId, ref: "Account", required: true },

    amount: { type: Number, required: true },
    month: { type: String, required: true },
    method: {
      type: String,
      enum: ["Bkash", "Nagad", "Rocket", "Cash"],
      default: "Bkash",
      required: true,
    },

    transactionId: String,
    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
    },

    approvedBy: { type: Schema.Types.ObjectId, ref: "User" },
    approvedAt: Date,

    rejectedBy: { type: Schema.Types.ObjectId, ref: "User" },
    rejectedAt: { type: Schema.Types.ObjectId, ref: "User" },
    rejectReason: String,
  },
  {
    timestamps: true,
  }
);

const Request =
  mongoose.models.Request || mongoose.model<IRequest>("Request", requestSchema);
export default Request;
