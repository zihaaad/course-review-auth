import express from "express";
import {CourseControllers} from "./course.controller";
import validateRequest from "../../middlewares/validateRequest";
import {courseSchema, updateCourseSchema} from "./course.validation";

const router = express.Router();

router.post(
  "/course",
  validateRequest(courseSchema),
  CourseControllers.createCourse
);
router.get("/course/best", CourseControllers.bestCourse);
router.get("/courses", CourseControllers.getAllCourses);
router.put(
  "/courses/:courseId",
  validateRequest(updateCourseSchema),
  CourseControllers.updateCourse
);
router.get("/courses/:courseId/reviews", CourseControllers.courseWithReviews);

export const CourseRoutes = router;
