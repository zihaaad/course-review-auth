import {CourseServices} from "./course.service";
import sendResponse from "../../utilities/sendResponse";
import catchAsync from "../../utilities/catchAsync";
const createCourse = catchAsync(async (req, res) => {
  const result = await CourseServices.createCourse(req.body);
  sendResponse(res, {
    statusCode: 200,
    message: "Course created successfully",
    data: result,
  });
});
const getAllCourses = catchAsync(async (req, res) => {
  const result = await CourseServices.getAllCourses(req.query);

  sendResponse(res, {
    statusCode: 200,
    message: "Courses retrieved successfully",
    meta: result.meta,
    data: result.course,
  });
});

const updateCourse = catchAsync(async (req, res) => {
  const {courseId} = req.params;
  const result = await CourseServices.updateCourse(courseId, req.body);
  sendResponse(res, {
    statusCode: 200,
    message: "Course updated successfully",
    data: result,
  });
});

const courseWithReviews = catchAsync(async (req, res) => {
  const {courseId} = req.params;
  const result = await CourseServices.courseWithReviews(courseId);
  sendResponse(res, {
    statusCode: 200,
    message: "Course and Reviews retrieved successfully",
    data: result,
  });
});

const bestCourse = catchAsync(async (req, res) => {
  const result = await CourseServices.bestCourse();
  sendResponse(res, {
    statusCode: 200,
    message: "Best course retrieved successfully",
    data: result,
  });
});

export const CourseControllers = {
  createCourse,
  getAllCourses,
  bestCourse,
  updateCourse,
  courseWithReviews,
};
