import { Model, ObjectId } from "mongoose";

export interface IVerification {
  email: string;
  accessToken: string;
  expiresIn: Date;
  user: ObjectId;
}

export interface IResetPassword {
  accessToken: string;
  expiresIn: Date;
  user: ObjectId;
}

export interface IFeeAccount {
  voucherId: string;
  dueDate: Date;
  paidDate: Date;
  payableAmount: string;
  paidAmount: string;
  discount: string;
}
export interface IUser {
  id: ObjectId;
  email: string;
  password: string;
  firstName?: string;
  lastName?: string;
  gender?: string;
  grade?: string;
  studentId?: string;
  feeAccount?: IFeeAccount;
  isAdmin?: Boolean;
  verified: boolean;
  verifications?: ObjectId[];
  resetPasswords?: ObjectId[];
}

export interface IUserMethods {
  comparePassword: (password: string) => boolean;
}

export type UserModel = Model<IUser, unknown, IUserMethods>;

export type VerificationRequestPayload = Pick<IUser, "email">;

export type UpdateProfilePayload = Required<
  Pick<IUser, "firstName" | "lastName">
>;

export type UpdateEmailPayload = Pick<IUser, "email" | "password">;

export interface UpdatePasswordPayload {
  oldPassword: string;
  newPassword: string;
}

export interface DeleteProfilePayload {
  password: string;
}
