import { Router } from "express";

import auth from "./routes/auth";
import brand from "./routes/brand";
import category from "./routes/category";
import product from "./routes/product";
import gernalSetting from "./routes/gernalSettings";
import terms from "./routes/terms";
import opportunityRequest from "./routes/opportunityRequest";
import contactUs from "./routes/contactUs";
import news from "./routes/news";
import feeAccount from "./routes/feeAccount";

const router: Router = Router();

const routes: {
  [key: string]: (router: Router) => void;
} = {
  auth,
  brand,
  category,
  product,
  gernalSetting,
  terms,
  opportunityRequest,
  contactUs,
  news,
  feeAccount,
};

for (const route in routes) {
  routes[route](router);
}

export { router };
