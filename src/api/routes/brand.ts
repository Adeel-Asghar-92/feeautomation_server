import express from "express";
import { authenticate } from "../middlewares"; // Import your authentication middleware
import { Router } from "express";
import { brandValidation } from "../../validations/brandValidation";
import { brandController } from "../../controllers/brandController";

const brand = (router: Router): void => {
  router.post("/brand/create", brandValidation.create, brandController.create);
  router.post("/brand/update", brandValidation.update, brandController.update);
  // router.post("/brand/delete", brandValidation.delete, brandController.delete);
  router.get("/brand/get", brandController.get);
};

export default brand;
