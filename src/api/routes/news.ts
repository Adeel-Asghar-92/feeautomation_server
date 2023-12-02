import { authenticate } from "../middlewares"; // Import your authentication middleware
import { Router } from "express";
import { newsValidation } from "../../validations/newsValidation";
import { newsController } from "../../controllers/newsController";

// this is for subcription
const news = (router: Router): void => {
  router.post("/news/create", newsValidation.create, newsController.create);
  // router.post("/news/update", newsValidation.update, newsController.update);
  // router.post("/news/delete", newsValidation.delete, newsController.delete);
  router.get("/news/get", newsController.get);
};

export default news;
