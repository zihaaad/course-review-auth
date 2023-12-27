import express from "express";
import {CategoryRoutes} from "../modules/Category/category.route";
import {ReviewRoutes} from "../modules/Review/review.route";
import {CourseRoutes} from "../modules/Course/course.route";
import {AuthRoutes} from "../modules/Auth/auth.route";

const router = express.Router();

const routes = [
  {
    path: "/auth",
    route: AuthRoutes,
  },
  {
    path: "/",
    route: CourseRoutes,
  },
  {
    path: "/reviews",
    route: ReviewRoutes,
  },
  {
    path: "/categories",
    route: CategoryRoutes,
  },
];

routes.forEach((route) => router.use(route.path, route.route));

export default router;
