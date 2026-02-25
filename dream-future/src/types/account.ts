import { ObjectId } from "mongoose";

export interface IAccount {
  _id: ObjectId | string;
  name: string;

  userId: ObjectId | string;

  status: "active" | "block";

  totalDeposit: number;
  totalProfit: number;
  totalRewards: number;
  balance: number;
}
