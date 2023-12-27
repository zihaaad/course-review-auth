import express from "express";
import {CourseControllers} from "./course.controller";
import validateRequest from "../../middlewares/validateRequest";
import {courseSchema, updateCourseSchema} from "./course.validation";
import auth from "../../middlewares/auth";

const router = express.Router();

router.post(
  "/course",
  auth("admin"),
  validateRequest(courseSchema),
  CourseControllers.createCourse
);
router.get("/course/best", CourseControllers.bestCourse);
router.get("/courses", CourseControllers.getAllCourses);
router.put(
  "/courses/:courseId",
  auth("admin"),
  validateRequest(updateCourseSchema),
  CourseControllers.updateCourse
);
router.get("/courses/:courseId/reviews", CourseControllers.courseWithReviews);

export const CourseRoutes = router;
