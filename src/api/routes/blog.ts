import express from "express";
import { authenticate } from "../middlewares"; // Import your authentication middleware
import { Router } from "express";
import { blogValidation } from "../../validations/blogValidation";
import { blogController } from "../../controllers/blogController";

const blog = (router: Router): void => {
  router.post("/blog/create", blogValidation.create, blogController.create);
  router.post("/blog/update", blogValidation.update, blogController.update);
  router.post("/blog/delete", blogValidation.delete, blogController.delete);
  router.get("/blog/get", blogController.get);
  router.post("/blog/getById", blogController.getById);
};

export default blog;
