import express from "express";
import { authenticate } from "../middlewares"; // Import your authentication middleware
import { Router } from "express";
// import { User } from "./userModel"; // Import your User model

// const router = express.Router();
import { authValidation } from "../../validations/authValidation";
import { authController } from "../../controllers/authController";

const auth = (router: Router): void => {
  console.log(router);

  router.post("/auth/sign-in", authValidation.signIn, authController.signIn);

  router.post("/auth/sign-up", authValidation.signUp, authController.signUp);
  router.post("/auth/updateStudent", authController.updateStudent);
  router.post("/auth/getStudentsByEmail", authController.getStudentsByEmail);

  // router.get('/auth/sign-out',authController.signOut)

  router.post(
    "/auth/password/reset",
    authenticate,
    authValidation.resetPassword,
    authController.resetPassword
  );

  // router.post(
  //   '/auth/password/new/:accessToken',
  //   authValidation.newPassword,
  //   authController.newPassword
  // )
};

// Protected route

// router.get("/protected", authenticate, (req, res) => {
//   // This route is protected; only authenticated users can access it.
//   res.json({ message: "You have access to this route." });
// });

export default auth;
