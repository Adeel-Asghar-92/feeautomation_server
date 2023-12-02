import { Request, Response } from "express";
import { StatusCodes, ReasonPhrases } from "http-status-codes";
import winston from "winston";
import { IBodyRequest } from "../contracts/request";
import { companyInfoService } from "../services/companyInfoService";
import { companyLogoService } from "../services/companyLogoService";
import { companyVideoService } from "../services/companyVideoService";
import { companySocialMediaLinksService } from "../services/companySocialMediaLinksService";

export const gernalSettingsController = {
  updateLogo: async ({ body: { logo } }: Request, res: Response) => {
    try {
      const company = await companyLogoService.getFirst();
      if (company) {
        const companyLogo = await companyLogoService.updateById(
          company.id,
          logo
        );
        return res.status(StatusCodes.OK).json({
          data: { companyLogo },
          message: ReasonPhrases.OK,
          status: StatusCodes.OK,
        });
      } else {
        const brand = await companyLogoService.create({ logo });
        return res.status(StatusCodes.OK).json({
          data: { brand },
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

  updateCompanyInfo: async (
    { body: { address, address_ar, direction, mail, phoneNo } }: Request,
    res: Response
  ) => {
    try {
      const companyInfo1 = await companyInfoService.getFirst();

      if (companyInfo1) {
        const companyLogo = await companyInfoService.updateById(
          companyInfo1.id,
          address,
          address_ar,
          direction,
          mail,
          phoneNo
        );
        return res.status(StatusCodes.OK).json({
          data: { companyLogo },
          message: ReasonPhrases.OK,
          status: StatusCodes.OK,
        });
      } else {
        const brand = await companyInfoService.create({
          address,
          direction,
          mail,
          phoneNo,
        });
        return res.status(StatusCodes.OK).json({
          data: { brand },
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

  updateVideo: async ({ body: { video } }: Request, res: Response) => {
    try {
      const companyVideo1 = await companyVideoService.getFirst();

      if (companyVideo1) {
        const companyVideo = await companyVideoService.updateById(
          companyVideo1.id,
          video
        );
        return res.status(StatusCodes.OK).json({
          data: { companyVideo },
          message: ReasonPhrases.OK,
          status: StatusCodes.OK,
        });
      } else {
        const brand = await companyVideoService.create({ video });
        return res.status(StatusCodes.OK).json({
          data: { brand },
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

  updateSocialMediaLinks: async (
    { body: { facebook, instagram, twitter, linkedin } }: Request,
    res: Response
  ) => {
    try {
      console.log("Run");
      const companySocialM = await companySocialMediaLinksService.getFirst();
      console.log("companySocialM", companySocialM);

      if (companySocialM) {
        const companySocialMedia =
          await companySocialMediaLinksService.updateById(
            companySocialM.id,
            facebook,
            instagram,
            twitter,
            linkedin
          );
        return res.status(StatusCodes.OK).json({
          data: { companySocialMedia },
          message: ReasonPhrases.OK,
          status: StatusCodes.OK,
        });
      } else {
        const companySocialMedia = await companySocialMediaLinksService.create({
          facebook,
          instagram,
          twitter,
          linkedin,
        });
        return res.status(StatusCodes.OK).json({
          data: { companySocialMedia },
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

  getLogo: async ({ body: {} }: Request, res: Response) => {
    try {
      const companyLogo = await companyLogoService.getAll();
      return res.status(StatusCodes.OK).json({
        data: { companyLogo },
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

  getCompanyInfo: async ({ body: {} }: Request, res: Response) => {
    try {
      const companyInfo = await companyInfoService.getAll();
      return res.status(StatusCodes.OK).json({
        data: { companyInfo },
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

  getVideo: async ({ body: {} }: Request, res: Response) => {
    try {
      const companyVideo = await companyVideoService.getAll();
      return res.status(StatusCodes.OK).json({
        data: { companyVideo },
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

  getSocialMediaLinks: async ({ body: {} }: Request, res: Response) => {
    try {
      console.log("run");

      const companySocialMediaLinks =
        await companySocialMediaLinksService.getAll();
      return res.status(StatusCodes.OK).json({
        data: { companySocialMediaLinks },
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
