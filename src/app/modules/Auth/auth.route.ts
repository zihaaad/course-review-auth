import express from "express";
import validateRequest from "../../middlewares/validateRequest";
import {AuthValidations} from "./auth.validation";
import {AuthControllers} from "./auth.controller";

const router = express.Router();

router.post(
  "/register",
  validateRequest(AuthValidations.createUserValidationSchema),
  AuthControllers.createUser
);

export const AuthRoutes = router;
