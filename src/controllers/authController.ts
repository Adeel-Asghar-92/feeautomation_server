import { Request, Response } from "express";
import { startSession } from "mongoose";
import { StatusCodes, ReasonPhrases } from "http-status-codes";
import winston from "winston";

import { ExpiresInDays } from "../constants";
import {
  NewPasswordPayload,
  ResetPasswordPayload,
  SignInPayload,
  SignUpPayload,
} from "../contracts/auth";
import {
  resetPasswordService,
  verificationService,
  userService,
} from "../services";
import { jwtSign } from "../utils/jwt";
import {
  IBodyRequest,
  ICombinedRequest,
  IContextRequest,
  IUserRequest,
} from "../contracts/request";
import { createCryptoString } from "../utils/cryptoString";
import { createDateAddDaysFromNow } from "../utils/dates";
import { createHash } from "../utils/hash";
import { IFeeAccount } from "../contracts/user";

const generateFeeAccountsForYear = (year: number): IFeeAccount[] => {
  const feeAccounts: IFeeAccount[] = [];
  const currentYear = new Date().getFullYear();
  const monthsInYear = 12;

  for (let month = 0; month < monthsInYear; month++) {
    feeAccounts.push({
      voucherId: "VOC-" + Math.random().toString().slice(-8),
      dueDate: new Date(year, month, 10), // Set the date to the 1st of each month
      paidDate: null, // Set the date to the 1st of each month
      payableAmount: "0",
      paidAmount: "0",
      discount: "0",
    });
  }
  return feeAccounts;
};

export const authController = {
  signIn: async ({ body: { email, password } }: Request, res: Response) => {
    try {
      const user = await userService.getByEmail(email);

      const comparePassword = user?.comparePassword(password);
      if (!user || !comparePassword) {
        return res.status(StatusCodes.NOT_FOUND).json({
          message: ReasonPhrases.NOT_FOUND,
          status: StatusCodes.NOT_FOUND,
        });
      }

      const { accessToken } = jwtSign(user.id);

      return res.status(StatusCodes.OK).json({
        data: { accessToken },
        message: ReasonPhrases.OK,
        status: StatusCodes.OK,
      });
    } catch (error) {
      winston.error(error);

      return res.status(StatusCodes.BAD_REQUEST).json({
        message: ReasonPhrases.BAD_REQUEST,
        status: StatusCodes.BAD_REQUEST,
      });
    }
  },

  signUp: async (
    {
      body: { firstName, lastName, gender, email, grade, password },
    }: IBodyRequest<any>,
    res: Response
  ) => {
    try {
      const isUserExist = await userService.isExistByEmail(email);
      const currentYear = new Date().getFullYear();
      if (isUserExist) {
        return res.status(StatusCodes.CONFLICT).json({
          message: ReasonPhrases.CONFLICT,
          status: StatusCodes.CONFLICT,
        });
      }

      const hashedPassword = await createHash(password);
      const user = await userService.create({
        firstName,
        lastName,
        gender,
        email,
        grade,
        studentId: "ST" + Math.random().toString().slice(-8),
        password: hashedPassword,
        feeAccount: generateFeeAccountsForYear(currentYear),
      });

      const { accessToken } = jwtSign(user.id);

      return res.status(StatusCodes.OK).json({
        data: { accessToken },
        message: ReasonPhrases.OK,
        status: StatusCodes.OK,
      });
    } catch (error) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        message: ReasonPhrases.BAD_REQUEST,
        status: StatusCodes.BAD_REQUEST,
      });
    }
  },
  updateStudent: async (
    {
      body: {_id, firstName, lastName, gender, email, grade, password },
      params: { userId },
    }: IBodyRequest<any>,
    res: Response
  ) => {
    try {
      const student = await userService.getById(_id);
      const currentYear = new Date().getFullYear();

      if (!student) {
        return res.status(StatusCodes.CONFLICT).json({
          message: ReasonPhrases.CONFLICT,
          status: StatusCodes.CONFLICT,
        });
      }

      const hashedPassword = await createHash(password);
        student.firstName= firstName
        student.lastName= lastName
        student.gender= gender
        student.email= email
        student.grade= grade
        student.password= hashedPassword
        const updatedUser = await userService.updateProfileByUserId(_id,student)
      return res.status(StatusCodes.OK).json({
        data: { updatedUser },
        message: ReasonPhrases.OK,
        status: StatusCodes.OK,
      });
    } catch (error) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        message: ReasonPhrases.BAD_REQUEST,
        status: StatusCodes.BAD_REQUEST,
      });
    }
  },

  getStudents: async ({ body: {} }: Request, res: Response) => {
    try {
      console.log("run");

      const students = await userService.getAll();
      console.log("students", students);

      return res.status(StatusCodes.OK).json({
        data: { students },
        message: ReasonPhrases.OK,
        status: StatusCodes.OK,
      });
    } catch (error) {
      console.log("error ====>>>>", error);

      winston.error(error);

      return res.status(StatusCodes.BAD_REQUEST).json({
        message: ReasonPhrases.BAD_REQUEST,
        status: StatusCodes.BAD_REQUEST,
      });
    }
  },
  // signOut: async (
  //   { context: { user, accessToken } }: IContextRequest<IUserRequest>,
  //   res: Response
  // ) => {
  //   try {
  //     await redis.client.set(`expiredToken:${accessToken}`, `${user.id}`, {
  //       EX: process.env.REDIS_TOKEN_EXPIRATION,
  //       NX: true,
  //     });

  //     return res.status(StatusCodes.OK).json({
  //       message: ReasonPhrases.OK,
  //       status: StatusCodes.OK,
  //     });
  //   } catch (error) {
  //     return res.status(StatusCodes.BAD_REQUEST).json({
  //       message: ReasonPhrases.BAD_REQUEST,
  //       status: StatusCodes.BAD_REQUEST,
  //     });
  //   }
  // },

  resetPassword: async (
    { body: { email } }: IBodyRequest<ResetPasswordPayload>,
    res: Response
  ) => {
    const session = await startSession();

    try {
      const user = await userService.getByEmail(email);

      if (!user) {
        return res.status(StatusCodes.OK).json({
          message: ReasonPhrases.OK,
          status: StatusCodes.OK,
        });
      }

      session.startTransaction();

      const cryptoString = createCryptoString();

      const dateFromNow = createDateAddDaysFromNow(ExpiresInDays.ResetPassword);

      const resetPassword = await resetPasswordService.create(
        {
          userId: user.id,
          accessToken: cryptoString,
          expiresIn: dateFromNow,
        },
        session
      );

      await userService.addResetPasswordToUser(
        {
          userId: user.id,
          resetPasswordId: resetPassword.id,
        },
        session
      );

      // const userMail = new UserMail();

      // userMail.resetPassword({
      //   email: user.email,
      //   accessToken: cryptoString,
      // });

      await session.commitTransaction();
      session.endSession();

      return res.status(StatusCodes.OK).json({
        message: ReasonPhrases.OK,
        status: StatusCodes.OK,
      });
    } catch (error) {
      winston.error(error);

      if (session.inTransaction()) {
        await session.abortTransaction();
        session.endSession();
      }
      return res.status(StatusCodes.BAD_REQUEST).json({
        message: ReasonPhrases.BAD_REQUEST,
        status: StatusCodes.BAD_REQUEST,
      });
    }
  },

  newPassword: async (
    {
      body: { password },
      params,
    }: ICombinedRequest<null, NewPasswordPayload, { accessToken: string }>,
    res: Response
  ) => {
    const session = await startSession();
    try {
      const resetPassword = await resetPasswordService.getByValidAccessToken(
        params.accessToken
      );

      if (!resetPassword) {
        return res.status(StatusCodes.FORBIDDEN).json({
          message: ReasonPhrases.FORBIDDEN,
          status: StatusCodes.FORBIDDEN,
        });
      }

      const user = await userService.getById(resetPassword.user);

      if (!user) {
        return res.status(StatusCodes.NOT_FOUND).json({
          message: ReasonPhrases.NOT_FOUND,
          status: StatusCodes.NOT_FOUND,
        });
      }

      session.startTransaction();
      const hashedPassword = await createHash(password);

      await userService.updatePasswordByUserId(
        resetPassword.user,
        hashedPassword,
        session
      );

      await resetPasswordService.deleteManyByUserId(user.id, session);

      const { accessToken } = jwtSign(user.id);

      // const userMail = new UserMail();

      // userMail.successfullyUpdatedPassword({
      //   email: user.email,
      // });

      await session.commitTransaction();
      session.endSession();

      return res.status(StatusCodes.OK).json({
        data: { accessToken },
        message: ReasonPhrases.OK,
        status: StatusCodes.OK,
      });
    } catch (error) {
      winston.error(error);

      if (session.inTransaction()) {
        await session.abortTransaction();
        session.endSession();
      }

      return res.status(StatusCodes.BAD_REQUEST).json({
        message: ReasonPhrases.BAD_REQUEST,
        status: StatusCodes.BAD_REQUEST,
      });
    }
  },
};
