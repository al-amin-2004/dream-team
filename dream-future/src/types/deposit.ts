import { ObjectId } from "mongoose";

type Methods = "Bkash" | "Nagad" | "Rocket" | "Cash";

export interface IDeposit {
  _id: ObjectId | string;

  userId: ObjectId | string;
  accountId: ObjectId | string;

  amount: number;
  month: string;
  method: Methods;
  transactionId?: string;
  depositDate: string;

  depositBy?: ObjectId | string;
  approvedBy?: ObjectId | string;
}
