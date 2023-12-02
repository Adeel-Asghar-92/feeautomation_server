import express from "express";
import { authenticate } from "../middlewares"; // Import your authentication middleware
import { Router } from "express";
import { opportunityRequestController } from "../../controllers/opportunityRequestController";
import { opportunityRequestValidation } from "../../validations/opportunityRequestValidation";

const opportunityRequest = (router: Router): void => {
  router.post(
    "/opportunityRequest/create",
    opportunityRequestValidation.create,
    opportunityRequestController.create
  );
  router.post(
    "/opportunityRequest/delete",
    opportunityRequestController.delete
  );
  router.get("/opportunityRequest/get", opportunityRequestController.get);
};

export default opportunityRequest;
