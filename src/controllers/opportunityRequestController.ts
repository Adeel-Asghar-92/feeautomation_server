import { Request, Response } from "express";
import { StatusCodes, ReasonPhrases } from "http-status-codes";
import winston from "winston";
import { IBodyRequest } from "../contracts/request";
import { opportunityRequestService } from "../services/opportunityRequestService";

export const opportunityRequestController = {
  create: async (
    {
      body: { firstName, LastName, mail, phoneNo, industry, country, cv },
    }: Request,
    res: Response
  ) => {
    try {
      console.log("run");

      const brand = await opportunityRequestService.create({
        firstName,
        LastName,
        mail,
        phoneNo,
        industry,
        country,
        cv,
      });
      return res.status(StatusCodes.OK).json({
        data: { brand },
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

  delete: async ({ body: { id } }: IBodyRequest<any>, res: Response) => {
    try {
      const isExist = await opportunityRequestService.getById(id);

      if (!isExist) {
        return res.status(StatusCodes.CONFLICT).json({
          message: ReasonPhrases.CONFLICT,
          status: StatusCodes.CONFLICT,
        });
      }
      const opportunityRequests = await opportunityRequestService.deleteById(
        id
      );

      return res.status(StatusCodes.OK).json({
        data: { opportunityRequests },
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

  get: async ({ body: {} }: Request, res: Response) => {
    try {
      const opportunityRequests = await opportunityRequestService.getAll();

      return res.status(StatusCodes.OK).json({
        data: { opportunityRequests },
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
