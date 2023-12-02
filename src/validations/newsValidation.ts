import { NextFunction, Request, Response } from "express";
import { StatusCodes, ReasonPhrases } from "http-status-codes";
import winston from "winston";

export const newsValidation = {
  create: (req: Request, res: Response, next: NextFunction) => {
    try {
      if (
        !req.body.mail
        // !req.body.heading_en ||
        // !req.body.subHeading_en ||
        // !req.body.description_en ||
        // !req.body.heading_ar ||
        // !req.body.subHeading_ar ||
        // !req.body.description_ar ||
        // !req.body.image
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
  update: (req: Request, res: Response, next: NextFunction) => {
    try {
      if (
        !req.body.id ||
        !req.body.heading_en ||
        !req.body.subHeading_en ||
        !req.body.description_en ||
        !req.body.heading_ar ||
        !req.body.subHeading_ar ||
        !req.body.description_ar ||
        !req.body.image
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
  delete: (req: Request, res: Response, next: NextFunction) => {
    try {
      if (!req.body.id) {
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
