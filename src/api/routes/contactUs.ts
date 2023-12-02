import { authenticate } from "../middlewares"; // Import your authentication middleware
import { Router } from "express";
import { sendMailValidation } from "../../validations/contactUsValidation";
import { sendMailController } from "../../controllers/contactUsController";

const contactUs = (router: Router): void => {
  router.post(
    "/contactus/create",
    sendMailValidation.create,
    sendMailController.create
  );
  // router.post(
  //   "/contactus/update",
  //   sendMailValidation.update,
  //   sendMailController.update
  // );
  // router.post(
  //   "/contactus/sendMail",
  //   sendMailValidation.delete,
  //   sendMailController.delete
  // );
  router.get("/contactus/get", sendMailController.get);
};

export default contactUs;
