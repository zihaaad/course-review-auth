import express from "express";
import {ReviewControllers} from "./review.controller";
import validateRequest from "../../middlewares/validateRequest";
import {ReviewValidationSchema} from "./review.validation";
import auth from "../../middlewares/auth";

const router = express.Router();

router.post(
  "/",
  auth("user"),
  validateRequest(ReviewValidationSchema),
  ReviewControllers.createReview
);

export const ReviewRoutes = router;
