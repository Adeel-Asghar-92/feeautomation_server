import { Request, Response } from "express";
import { StatusCodes, ReasonPhrases } from "http-status-codes";
import winston from "winston";
import { newsService } from "../services/newsService";
import { IBodyRequest } from "../contracts/request";
import { newsTemplate } from "../templates/news";
const nodemailer = require("nodemailer");

export const newsController = {
  create: async (
    {
      body: {
        mail,
        // heading_en,
        // subHeading_en,
        // description_en,
        // heading_ar,
        // subHeading_ar,
        // description_ar,
        // image,
      },
    }: Request,
    res: Response
  ) => {
    try {
      const emailType = "News Letter";
      // const newsHtml = newsTemplate(
      //   heading_en,
      //   subHeading_en,
      //   description_en,
      //   emailType
      // );

      // let transporter = nodemailer.createTransport({
      //   host: "smtp.office365.com",
      //   port: 587,
      //   secure: false, // true for 465, false for other ports
      //   auth: {
      //     user: "noreply@modernmills.com.sa", // your email
      //     pass: "Ein%4$0T/?:i/@eN",
      //   },
      //   tls: {
      //     rejectUnauthorized: false,
      //   },
      // });

      // let mailOptions = {
      //   from: "noreply@modernmills.com.sa", // sender address
      //   // to: " adeelasghar9292@gmail.com", // list of receivers
      //   to: "newsletter@modernmills.com.sa ", // list of receivers
      //   subject: "News Letter", // Subject line
      //   text: "", // plain text body
      //   html: newsHtml, // html body
      // };

      // transporter.sendMail(mailOptions, (error, info) => {
      //   if (error) {
      //     return console.log(error);
      //   }
      //   console.log("Message sent: %s", info.messageId);
      // });

      const contactUs = await newsService.create({
        mail,
        // heading_en,
        // subHeading_en,
        // description_en,
        // heading_ar,
        // subHeading_ar,
        // description_ar,
        // image,
      });

      return res.status(StatusCodes.OK).json({
        data: { contactUs },
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
        heading_en,
        subHeading_en,
        description_en,
        heading_ar,
        subHeading_ar,
        description_ar,
        image,
      },
    }: IBodyRequest<any>,
    res: Response
  ) => {
    try {
      const isExist = await newsService.getById(id);

      if (!isExist) {
        return res.status(StatusCodes.CONFLICT).json({
          message: ReasonPhrases.CONFLICT,
          status: StatusCodes.CONFLICT,
        });
      }
      const news = await newsService.updateById(
        id,
        heading_en,
        subHeading_en,
        description_en,
        heading_ar,
        subHeading_ar,
        description_ar,
        image
      );

      return res.status(StatusCodes.OK).json({
        data: { news },
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
      const isExist = await newsService.getById(id);

      if (!isExist) {
        return res.status(StatusCodes.CONFLICT).json({
          message: ReasonPhrases.CONFLICT,
          status: StatusCodes.CONFLICT,
        });
      }
      const news = await newsService.deleteById(id);

      return res.status(StatusCodes.OK).json({
        data: { news },
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

      const news = await newsService.getAll();

      return res.status(StatusCodes.OK).json({
        data: { news },
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
