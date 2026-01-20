import { ObjectId } from "mongoose";

type Methods = "Bkash" | "Nagad" | "Rocket" | "Cash";
type Status = "pending" | "approved" | "rejected";

export interface IRequest {
  _id: ObjectId | string;

  userId: ObjectId | string;
  accountId: ObjectId | string;

  amount: number;
  month: string;
  method: Methods;

  transactionId?: string;

  status: Status;

  approvedBy?: ObjectId | string;

  rejectedBy?: ObjectId | string;
  rejectReason?: string;

  approvedOrRejectedAt?: Date;
  
  createdAt: Date;
}
