import { ObjectId } from "mongoose";

type Methods = "Bkash" | "Nagad" | "Rocket" | "Cash";

export interface IDeposit {
  _id: ObjectId | string;

  accountId: ObjectId | string;

  amount: number;
  month: string;
  method: Methods;
  transactionId?: string;
  referBy?: string;
  approvedBy?: string;
}
