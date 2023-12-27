import {JwtPayload} from "jsonwebtoken";
import {TReview} from "./review.interface";
import {Review} from "./review.model";
import {User} from "../Auth/auth.model";

const createReview = async (user: JwtPayload, payload: TReview) => {
  if (!(await Review.isCourseExists(String(payload.courseId)))) {
    throw new Error("CourseId is not a Valid ID");
  }

  const {username, email} = user;
  const userData = await User.findOne({username, email});

  if (userData) {
    payload.createdBy = userData._id;
  }

  const result = await Review.create(payload);
  return result;
};

export const ReviewServices = {
  createReview,
};
