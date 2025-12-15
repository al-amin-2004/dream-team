import { ObjectId } from "mongoose";

type UserRole = "member" | "treasurer" | "admin";
type Gender = "Male" | "Female" | "Other" | undefined;
type Blood =
  | "A+"
  | "A-"
  | "B+"
  | "B-"
  | "O+"
  | "O-"
  | "AB+"
  | "AB-"
  | undefined;

export interface IUser {
  _id: ObjectId | string;
  firstName: string;
  lastName?: string;
  username: string;
  email: string;
  phone?: string;
  password: string;
  avatar?: string;
  avatarId?: string;
  address?: string;
  gender?: Gender;
  birthday?: string;
  blood?: Blood;
  nationality: string;
  role: UserRole;
}
