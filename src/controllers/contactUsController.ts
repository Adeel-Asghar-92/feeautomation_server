import { Request, Response } from "express";
import { StatusCodes, ReasonPhrases } from "http-status-codes";
import winston from "winston";
import { contactUsTemplate } from "../templates/contactus";
import { contactUsService } from "../services/contactUsService";
import { IBodyRequest } from "../contracts/request";
const nodemailer = require("nodemailer");

export const sendMailController = {
  create: async (
    { body: { firstName, LastName, mail, phoneNo, reason, message } }: Request,
    res: Response
  ) => {
    try {
      const name = firstName + " " + LastName;
      const contactUsHtml = contactUsTemplate(
        name,
        mail,
        phoneNo,
        message,
        reason
      );

      let transporter = nodemailer.createTransport({
        host: "smtp.office365.com",
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
          user: "noreply@modernmills.com.sa", // your email
          pass: "Ein%4$0T/?:i/@eN",
        },
        tls: {
          rejectUnauthorized: false,
        },
      });

      let mailOptions = {
        from: "noreply@modernmills.com.sa", // sender address
        // to: " adeelasghar9292@gmail.com", // list of receivers
        to: "info@modernmills.com.sa", // list of receivers
        subject: "Contact Us", // Subject line
        text: "", // plain text body
        html: contactUsHtml, // html body
      };

      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          return console.log(error);
        }
        console.log("Message sent: %s", info.messageId);
      });
      const contactUs = await contactUsService.create({
        firstName,
        LastName,
        mail,
        phoneNo,
        reason,
        message,
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
      body: { id, firstName, LastName, mail, phoneNo, reason, message },
    }: IBodyRequest<any>,
    res: Response
  ) => {
    try {
      console.log("Update Brand");

      const isExist = await contactUsService.getById(id);

      if (!isExist) {
        return res.status(StatusCodes.CONFLICT).json({
          message: ReasonPhrases.CONFLICT,
          status: StatusCodes.CONFLICT,
        });
      }
      const contactUs = await contactUsService.updateById(
        id,
        firstName,
        LastName,
        mail,
        phoneNo,
        reason,
        message
      );

      return res.status(StatusCodes.OK).json({
        data: { contactUs },
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
      const isExist = await contactUsService.getById(id);

      if (!isExist) {
        return res.status(StatusCodes.CONFLICT).json({
          message: ReasonPhrases.CONFLICT,
          status: StatusCodes.CONFLICT,
        });
      }
      const brand = await contactUsService.deleteById(id);

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

      const contactUs = await contactUsService.getAll();

      return res.status(StatusCodes.OK).json({
        data: { contactUs },
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
