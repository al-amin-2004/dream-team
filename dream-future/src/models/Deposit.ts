import { IDeposit } from "@/types";
import mongoose, { Schema } from "mongoose";

const depositSchema = new Schema<IDeposit>(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    accountId: { type: Schema.Types.ObjectId, ref: "Account", required: true },

    amount: { type: Number, required: true },
    month: { type: String, required: true },
    method: {
      type: String,
      enum: ["Bkash", "Nagad", "Rocket", "Cash"],
      required: true,
    },
    transactionId: { type: String, default: null },
    depositDate: { type: Date, required: true, default: Date.now },

    depositBy: { type: Schema.Types.ObjectId, ref: "User", required: true },
    approvedBy: { type: Schema.Types.ObjectId, ref: "User" },
  },
  {
    timestamps: true,
  }
);

const Deposit =
  mongoose.models.Deposit || mongoose.model<IDeposit>("Deposit", depositSchema);
export default Deposit;
