import {TReview} from "./review.interface";
import {Review} from "./review.model";

const createReview = async (payload: TReview) => {
  if (!(await Review.isCourseExists(String(payload.courseId)))) {
    throw new Error("CourseId is not a Valid ID");
  }
  const result = await Review.create(payload);
  return result;
};

export const ReviewServices = {
  createReview,
};
