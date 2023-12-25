import express from "express";
import {CategoryControllers} from "./category.controller";
import validateRequest from "../../middlewares/validateRequest";
import {categoryValidations} from "./category.validation";

const router = express.Router();

router.post(
  "/",
  validateRequest(categoryValidations.categoryValidationSchema),
  CategoryControllers.createCategroy
);
router.get("/", CategoryControllers.getAllCategories);

export const CategoryRoutes = router;
