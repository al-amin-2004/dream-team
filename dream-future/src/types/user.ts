type UserRole = "member" | "treasurer" | "admin";
type Gender = "Male" | "Female" | "Other" | undefined;

export interface IUser {
  _id: string;
  firstName: string;
  lastName?: string;
  username: string;
  email: string;
  phone?: string;
  password: string;
  avatar?: string;
  address?: string;
  gender?: Gender;
  birthday?: string | null;
  role: UserRole;
}
