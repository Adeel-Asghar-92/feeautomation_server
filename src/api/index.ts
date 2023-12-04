import { Router } from "express";

import auth from "./routes/auth";
import feeAccount from "./routes/feeAccount";

const router: Router = Router();

const routes: {
  [key: string]: (router: Router) => void;
} = {
  auth,
  feeAccount,
};

for (const route in routes) {
  routes[route](router);
}

export { router };
