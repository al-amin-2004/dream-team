import { IDeposit } from "@/types";
import mongoose, { Schema } from "mongoose";

const depositSchema = new Schema<IDeposit>(
  {
    accountId: { type: Schema.Types.ObjectId, ref: "Account", required: true },
    amount: { type: Number, required: true },
    date: { type: String, required: false },
    month: { type: String, required: true },
    method: {
      type: String,
      enum: ["Bkash", "Nagad", "Rocket", "Cash"],
      default: "Bkash",
      required: true,
    },
    status: {
      type: String,
      enum: ["PENDING", "APPROVED", "REJECTED"],
      default: "PENDING",
    },
    transactionId: String,
    referBy: String,
    approvedBy: String,
  },
  {
    timestamps: true,
  }
);

const Deposit =
  mongoose.models.Deposit || mongoose.model<IDeposit>("Deposit", depositSchema);
export default Deposit;
