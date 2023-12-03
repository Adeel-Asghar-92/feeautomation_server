import { NextFunction, Request, Response } from "express";
import { StatusCodes, ReasonPhrases } from "http-status-codes";
import winston from "winston";

export const blogValidation = {
  create: (req: Request, res: Response, next: NextFunction) => {
    try {
      if (
        !req.body.title_ar ||
        !req.body.title_en ||
        !req.body.description_ar ||
        !req.body.image ||
        !req.body.description_en ||
        !req.body.introduction_ar ||
        !req.body.introduction_en ||
        !req.body.whatYouNeed_ar ||
        !req.body.whatYouNeed_en ||
        !req.body.conclusion_ar ||
        !req.body.conclusion_en
        // !req.body.featured

        // !req.body.createby ||
        // !req.body.designation
      ) {
        return res.status(StatusCodes.BAD_REQUEST).json({
          message: " One or more fields are missing",
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
        !req.body.title_ar ||
        !req.body.title_en ||
        !req.body.description_ar ||
        !req.body.image ||
        !req.body.description_en ||
        !req.body.introduction_ar ||
        !req.body.introduction_en ||
        !req.body.whatYouNeed_ar ||
        !req.body.whatYouNeed_en ||
        !req.body.conclusion_ar ||
        !req.body.conclusion_en
        // !req.body.featured

        // !req.body.createby ||
        // !req.body.designation
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
          message: ReasonPhrases.BAD_REQUEST,
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
