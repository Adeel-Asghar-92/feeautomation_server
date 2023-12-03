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
      if (isUserExist) {
        return res.status(StatusCodes.CONFLICT).json({
          message: ReasonPhrases.CONFLICT,
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

      if (grade) {
        filter.grade = grade;
      }

      if (status === "paid") {
        filter["feeAccount.paidAmount"] = { $ne: "0" };
      } else if (status === "unpaid") {
        filter["feeAccount.paidAmount"] = "0";
      }

      if (month) {
        const monthNumber = parseInt(month, 10);
        filter["feeAccount.dueDate"] = {
          $expr: { $eq: [{ $month: "$feeAccount.dueDate" }, monthNumber] },
        };
      }

      // Fetching students based on the constructed filter
      const students = await userService.find(filter);

      return res.status(StatusCodes.OK).json({
        data: { students },
        message: ReasonPhrases.OK,
        status: StatusCodes.OK,
      });
    } catch (error: any) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        message: ReasonPhrases.BAD_REQUEST,
        status: StatusCodes.BAD_REQUEST,
      });
    }
  },
};
