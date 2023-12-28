import express from "express";
import validateRequest from "../../middlewares/validateRequest";
import {AuthValidations} from "./auth.validation";
import {AuthControllers} from "./auth.controller";
import auth from "../../middlewares/auth";

const router = express.Router();

router.post(
  "/register",
  validateRequest(AuthValidations.createUserValidationSchema),
  AuthControllers.createUser
);

router.post(
  "/login",
  validateRequest(AuthValidations.loginUserValidationSchema),
  AuthControllers.loginUser
);

router.post(
  "/change-password",
  auth("admin", "user"),
  validateRequest(AuthValidations.changePasswordValidationSchema),
  AuthControllers.changePassword
);

export const AuthRoutes = router;
