import { Request, Response } from "express";
import { StatusCodes, ReasonPhrases } from "http-status-codes";
import winston from "winston";
import { IBodyRequest } from "../contracts/request";
import { blogService } from "../services/blogService";

export const blogController = {
  create: async (
    {
      body: {
        title_ar,
        title_en,
        description_ar,
        description_en,
        introduction_ar,
        introduction_en,
        whatYouNeed_ar,
        whatYouNeed_en,
        conclusion_ar,
        conclusion_en,
        createby,
        designation,
        image,
        featured,
      },
    }: Request,
    res: Response
  ) => {
    try {
      const blog = await blogService.create({
        title_ar,
        title_en,
        description_ar,
        description_en,
        introduction_ar,
        introduction_en,
        whatYouNeed_ar,
        whatYouNeed_en,
        conclusion_ar,
        conclusion_en,
        createby,
        designation,
        image,
        featured,
      });
      return res.status(StatusCodes.OK).json({
        data: { blog },
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

  update: async (
    {
      body: {
        id,
        title_ar,
        title_en,
        description_ar,
        description_en,
        introduction_ar,
        introduction_en,
        whatYouNeed_ar,
        whatYouNeed_en,
        conclusion_ar,
        conclusion_en,
        createby,
        designation,
        image,
        featured,
      },
    }: IBodyRequest<any>,
    res: Response
  ) => {
    try {
      const isExist = await blogService.getById(id);

      if (!isExist) {
        return res.status(StatusCodes.CONFLICT).json({
          message: ReasonPhrases.CONFLICT,
          status: StatusCodes.CONFLICT,
        });
      }
      const blog = await blogService.updateById(
        id,
        title_ar,
        title_en,
        description_ar,
        description_en,
        introduction_ar,
        introduction_en,
        whatYouNeed_ar,
        whatYouNeed_en,
        conclusion_ar,
        conclusion_en,
        createby,
        designation,
        image,
        featured
      );

      return res.status(StatusCodes.OK).json({
        data: { blog },
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

  delete: async ({ body: { id } }: IBodyRequest<any>, res: Response) => {
    try {
      const isExist = await blogService.getById(id);

      if (!isExist) {
        return res.status(StatusCodes.CONFLICT).json({
          message: ReasonPhrases.CONFLICT,
          status: StatusCodes.CONFLICT,
        });
      }
      const blog = await blogService.deleteById(id);

      return res.status(StatusCodes.OK).json({
        data: { blog },
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

  getById: async ({ body: { id } }: Request, res: Response) => {
    try {
      console.log("");

      const blog = await blogService.getById(id);

      return res.status(StatusCodes.OK).json({
        data: { blog },
        message: ReasonPhrases.OK,
        status: StatusCodes.OK,
      });
    } catch (error) {
      console.log(error);

      // winston.error(error);

      return res.status(StatusCodes.BAD_REQUEST).json({
        message: ReasonPhrases.BAD_REQUEST,
        status: StatusCodes.BAD_REQUEST,
      });
    }
  },
  get: async ({ body: {} }: Request, res: Response) => {
    try {
      console.log("run");

      const blog = await blogService.getAll();

      return res.status(StatusCodes.OK).json({
        data: { blog },
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
