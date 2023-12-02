import { NextFunction, Request, Response } from "express";
import { StatusCodes, ReasonPhrases } from "http-status-codes";
import winston from "winston";

export const companyInfoValidation = {
  updateCompanyInfo: (req: Request, res: Response, next: NextFunction) => {
    try {
      if (
        !req.body.address ||
        !req.body.address_ar ||
        !req.body.direction ||
        !req.body.mail ||
        !req.body.phoneNo
      ) {
        return res.status(StatusCodes.BAD_REQUEST).json({
          message: "One or more fields are missing",
          status: StatusCodes.BAD_REQUEST,
        });
      }
      return next();
    } catch (error) {
      winston.error(error);
      return res.status(StatusCodes.BAD_REQUEST).json({
        message: ReasonPhrases.BAD_REQUEST,
        status: StatusCodes.BAD_REQUEST,
      });
    }
  },
};
