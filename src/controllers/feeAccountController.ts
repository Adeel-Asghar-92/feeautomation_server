import { Request, Response } from "express";
import { StatusCodes, ReasonPhrases } from "http-status-codes";
import winston from "winston";

import { userService } from "../services";
import { IBodyRequest } from "../contracts/request";

export const feeAccountController = {
  updateFeeAccount: async (
    { body: { userId, feeAccount } }: IBodyRequest<any>,
    res: Response
  ) => {
    try {
      const isUserExist = await userService.getById(userId);
      if (!isUserExist) {
        return res.status(StatusCodes.CONFLICT).json({
          message: "User Not Found",
          status: StatusCodes.CONFLICT,
        });
      }

      const user = await userService.updateFeeAccount(userId, {
        feeAccount,
      });

      return res.status(StatusCodes.OK).json({
        data: { user },
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

  getReport: async (
    { body: { grade, status, month } }: Request,
    res: Response
  ) => {
    try {
      // const { grade, status, month } = req.query;

      // Constructing the filter object based on the provided request data
      const filter: any = {};

      // if (grade) {
      //   filter.grade = grade;
      // }

      // if (status === "paid") {
      //   filter["feeAccount.paidAmount"] = { $ne: "0" };
      // } else if (status === "unpaid") {
      filter["feeAccount.paidAmount"] = "0";
      // }

      // if (month) {
      //   const monthNumber = parseInt(month, 10);
      //   filter["feeAccount.dueDate"] = {
      //     $expr: { $eq: [{ $month: "$feeAccount.dueDate" }, monthNumber] },
      //   };
      // }
      if (month) {
        filter["feeAccount.dueDate"] = {
          $gte: new Date(`2024-${month}-01`),
          $lt: new Date(`2024-${month}-31`),
        };
      }
      if (grade) {
        filter["grade"] = grade;
      }

      // Fetching students based on the constructed filter
      const students = await userService.find(filter);
      // const studentsWithTotals = students.map((student: any) => {
      //   const totalPaidAmount = student.feeAccount.reduce(
      //     (acc, curr) => acc + Number(curr.paidAmount),
      //     0
      //   );
      //   const totalPayableAmount = student.feeAccount.reduce(
      //     (acc, curr) => acc + Number(curr.payableAmount) - Number(curr.discount),
      //     0
      //   );

      //   return {
      //     _id: student._id,
      //     firstName: student.firstName,
      //     lastName: student.lastName,
      //     email: student.email,
      //     gender: student.gender,
      //     grade: student.grade,
      //     studentId: student.studentId,
      //     verified: student.verified,
      //     createdAt: student.createdAt,
      //     updatedAt: student.updatedAt,
      //     feeAccount: student.feeAccount,
      //     totalPaidAmount,
      //     totalPayableAmount,
      //   };
      // });

      // console.log("studentsWithTotals", studentsWithTotals);

      return res.status(StatusCodes.OK).json({
        data: { students: students },
        message: ReasonPhrases.OK,
        status: StatusCodes.OK,
      });
    } catch (error: any) {
      console.log(error);

      return res.status(StatusCodes.BAD_REQUEST).json({
        message: ReasonPhrases.BAD_REQUEST,
        status: StatusCodes.BAD_REQUEST,
      });
    }
  },
};
