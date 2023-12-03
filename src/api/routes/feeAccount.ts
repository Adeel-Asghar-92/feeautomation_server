import express from "express";
import { authenticate } from "../middlewares"; // Import your authentication middleware
import { Router } from "express";
import { feeAccountController } from "../../controllers/feeAccountController";

const feeAccount = (router: Router): void => {
  router.post(
    "/student/updateFeeAccount",
    feeAccountController.updateFeeAccount
  );
  router.post("/student/generateReport", feeAccountController.getReport);
};

export default feeAccount;
