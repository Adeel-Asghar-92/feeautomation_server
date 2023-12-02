import { NextFunction, Request, Response } from "express";
import { StatusCodes, ReasonPhrases } from "http-status-codes";
import winston from "winston";

export const opportunityRequestValidation = {
  create: (req: Request, res: Response, next: NextFunction) => {
    try {
      if (
        !req.body.firstName ||
        !req.body.LastName ||
        !req.body.mail ||
        !req.body.phoneNo ||
        !req.body.industry ||
        !req.body.country ||
        !req.body.cv
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
