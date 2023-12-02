import express from "express";
import { authenticate } from "../middlewares"; // Import your authentication middleware
import { Router } from "express";
import { categoryValidation } from "../../validations/categoryValidation";
import { categoryController } from "../../controllers/categoryController";

const category = (router: Router): void => {
  router.post(
    "/category/create",
    categoryValidation.create,
    categoryController.create
  );

  router.post(
    "/category/update",
    categoryValidation.update,
    categoryController.update
  );

  // router.post(
  //   "/category/delete",
  //   categoryValidation.delete,
  //   categoryController.delete
  // );
  router.get("/category/get", categoryController.get);
};

export default category;
