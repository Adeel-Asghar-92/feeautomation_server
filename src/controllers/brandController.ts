import { Request, Response } from "express";
import { StatusCodes, ReasonPhrases } from "http-status-codes";
import winston from "winston";
import { IBodyRequest } from "../contracts/request";
import { brandService } from "../services/brandService";

export const brandController = {
  create: async ({ body: { name, name_ar, image, type } }: Request, res: Response) => {
    try {
      console.log(name);

      const brand = await brandService.create({ name, name_ar, image, type });
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

  update: async (
    { body: { brandId, name, name_ar, image, type } }: IBodyRequest<any>,
    res: Response
  ) => {
    try {
      console.log("Update Brand");

      const isExist = await brandService.getById(brandId);

      if (!isExist) {
        return res.status(StatusCodes.CONFLICT).json({
          message: ReasonPhrases.CONFLICT,
          status: StatusCodes.CONFLICT,
        });
      }
      const brand = await brandService.updateBrandNameById(brandId, name, name_ar, image, type);

      return res.status(StatusCodes.OK).json({
        data: { brand },
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

  delete: async ({ body: { brandId } }: IBodyRequest<any>, res: Response) => {
    try {
      const isExist = await brandService.getById(brandId);

      if (!isExist) {
        return res.status(StatusCodes.CONFLICT).json({
          message: ReasonPhrases.CONFLICT,
          status: StatusCodes.CONFLICT,
        });
      }
      const brand = await brandService.deleteById(brandId);

      return res.status(StatusCodes.OK).json({
        data: { brand },
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
      console.log("run");

      const brands = await brandService.getAll();
      console.log("brands", brands);

      return res.status(StatusCodes.OK).json({
        data: { brands },
        message: ReasonPhrases.OK,
        status: StatusCodes.OK,
      });
    } catch (error) {
      console.log("error ====>>>>", error);

      winston.error(error);

      return res.status(StatusCodes.BAD_REQUEST).json({
        message: ReasonPhrases.BAD_REQUEST,
        status: StatusCodes.BAD_REQUEST,
      });
    }
  },
};
