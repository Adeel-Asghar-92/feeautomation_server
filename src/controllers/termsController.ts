import { Request, Response } from "express";
import { StatusCodes, ReasonPhrases } from "http-status-codes";
import winston from "winston";
import { termsService } from "../services/termsService";

export const termsController = {
  updateTerms: async ({ body: { terms } }: Request, res: Response) => {
    try {
      const term = await termsService.getFirst();
      if (term) {
        const termRes = await termsService.updateTermsById(term.id, terms);
        return res.status(StatusCodes.OK).json({
          data: { termRes },
          message: ReasonPhrases.OK,
          status: StatusCodes.OK,
        });
      } else {
        const termsResp = await termsService.createTerms({ terms });
        return res.status(StatusCodes.OK).json({
          data: { termsResp },
          message: ReasonPhrases.OK,
          status: StatusCodes.OK,
        });
      }
    } catch (error) {
      winston.error(error);

      return res.status(StatusCodes.BAD_REQUEST).json({
        message: ReasonPhrases.BAD_REQUEST,
        status: StatusCodes.BAD_REQUEST,
      });
    }
  },

  updatePrivacy: async ({ body: { privacy } }: Request, res: Response) => {
    try {
      const term = await termsService.getFirst();
      if (term) {
        const termRes = await termsService.updatePrivacyById(term.id, privacy);
        return res.status(StatusCodes.OK).json({
          data: { termRes },
          message: ReasonPhrases.OK,
          status: StatusCodes.OK,
        });
      } else {
        const termsResp = await termsService.createPrivacy({ privacy });
        return res.status(StatusCodes.OK).json({
          data: { termsResp },
          message: ReasonPhrases.OK,
          status: StatusCodes.OK,
        });
      }
    } catch (error) {
      winston.error(error);

      return res.status(StatusCodes.BAD_REQUEST).json({
        message: ReasonPhrases.BAD_REQUEST,
        status: StatusCodes.BAD_REQUEST,
      });
    }
  },

  get: async ({ body: {} }: Request, res: Response) => {
    try {
      const terms = await termsService.getAll();
      return res.status(StatusCodes.OK).json({
        data: { terms },
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
};
