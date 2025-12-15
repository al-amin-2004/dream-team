import { ObjectId } from "mongoose";

type Methods = "Bkash" | "Nagad" | "Rocket" | "Cash";
type Status = "PENDING" | "APPROVED" | "REJECTED";

export interface IDeposit {
  _id?: ObjectId | string;

  accountId: ObjectId | string;

  amount: number;
  date?: string;
  month: string;
  method: Methods;
  status: Status;
  transactionId?: string;
  referBy?: string;
  approvedBy?: string;
}
