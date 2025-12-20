import { IAccount } from "@/types";
import mongoose, { Schema } from "mongoose";

const accountSchema = new Schema<IAccount>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    name: {
      type: String,
      default: "A",
      required: true,
      unique: true,
    },

    status: { type: String, enum: ["active", "block"], default: "block" },

    totalDeposit: { type: Number, default: 0 },
    totalProfit: { type: Number, default: 0 },
    totalRewards: { type: Number, default: 0 },
    balance: { type: Number, default: 0 },
  },
  {
    timestamps: true,
  }
);

const Account =
  mongoose.models.Account || mongoose.model<IAccount>("Account", accountSchema);
export default Account;
