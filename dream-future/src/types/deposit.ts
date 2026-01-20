import { Date, ObjectId } from "mongoose";

type Methods = "Bkash" | "Nagad" | "Rocket" | "Cash";

export interface IDeposit {
  _id: ObjectId | string;

  userId: ObjectId | string;
  accountId: ObjectId | string;

  amount: number;
  month: string;
  method: Methods;
  transactionId?: string;
  depositDate: Date;

  depositBy?: ObjectId | string;
  approvedBy?: ObjectId | string;
}
