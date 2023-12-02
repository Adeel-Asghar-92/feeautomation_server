import express from "express";
import { authenticate } from "../middlewares"; // Import your authentication middleware
import { Router } from "express";
import { categoryController } from "../../controllers/categoryController";
import { categoryValidation } from "../../validations/categoryValidation";
import { productController } from "../../controllers/productController";
import { productValidation } from "../../validations/productValidation";

const product = (router: Router): void => {
  router.post(
    "/product/create",
    productValidation.create,
    productController.create
  );

  router.post(
    "/product/update",
    productValidation.update,
    productController.update
  );

  router.post(
    "/product/delete",
    productValidation.delete,
    productController.delete
  );
  router.post(
    "/product/getById",
    productValidation.delete,
    productController.getById
  );
  router.get("/product/get", productController.get);
  router.post("/product/getsearch", productController.getall);
};

export default product;
