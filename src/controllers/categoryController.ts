import { Request, Response } from "express";
import { StatusCodes, ReasonPhrases } from "http-status-codes";
import winston from "winston";
import { IBodyRequest } from "../contracts/request";
import { brandService } from "../services/brandService";
import { categoryService } from "../services/categoryService";

export const categoryController = {
  create: async (
    { body: { name_en, name_ar, type, brand } }: Request,
    res: Response
  ) => {
    try {
      const category = await categoryService.create({
        name_en,
        name_ar,
        type,
        brand,
      });
      return res.status(StatusCodes.OK).json({
        data: { category },
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
  get: async ({ body: {} }: Request, res: Response) => {
    try {
      const categories = await categoryService.getAll();
      return res.status(StatusCodes.OK).json({
        data: { categories },
        message: ReasonPhrases.OK,
        status: StatusCodes.OK,
      });
    } catch (error) {
      return res.status(400).json({
        message: "wnent error",
        // winston.error(error);

        // return res.status(StatusCodes.BAD_REQUEST).json({
        //   message: ReasonPhrases.BAD_REQUEST,
        //   status: StatusCodes.BAD_REQUEST,
        // });
      });
    }
  },

  update: async (
    { body: { id, name_en, name_ar, type, brand } }: IBodyRequest<any>,
    res: Response
  ) => {
    try {
      const isExist = await categoryService.getById(id);

      if (!isExist) {
        return res.status(StatusCodes.CONFLICT).json({
          message: ReasonPhrases.CONFLICT,
          status: StatusCodes.CONFLICT,
        });
      }
      const category = await categoryService.updateCategoryById(
        id,
        name_en,
        name_ar,
        type,
        brand
      );

      return res.status(StatusCodes.OK).json({
        data: { category },
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
      const isExist = await categoryService.getById(id);

      if (!isExist) {
        return res.status(StatusCodes.CONFLICT).json({
          message: ReasonPhrases.CONFLICT,
          status: StatusCodes.CONFLICT,
        });
      }
      const category = await categoryService.deleteById(id);

      return res.status(StatusCodes.OK).json({
        data: { category },
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
};
