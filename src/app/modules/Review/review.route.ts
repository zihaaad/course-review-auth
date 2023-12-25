import express from "express";
import {ReviewControllers} from "./review.controller";
import validateRequest from "../../middlewares/validateRequest";
import {ReviewValidationSchema} from "./review.validation";

const router = express.Router();

router.post(
  "/",
  validateRequest(ReviewValidationSchema),
  ReviewControllers.createReview
);

export const ReviewRoutes = router;
