import express from "express";
import { authenticate } from "../middlewares"; // Import your authentication middleware
import { Router } from "express";
import { termsController } from "../../controllers/termsController";

const terms = (router: Router): void => {
  // router.post("/terms/create", termsValidation.create, termsController.create);
  router.post("/terms/updateTerms", termsController.updateTerms);
  router.post("/privacy/updatePrivacy", termsController.updatePrivacy);
  router.get("/terms_privacy/get", termsController.get);
};

export default terms;
