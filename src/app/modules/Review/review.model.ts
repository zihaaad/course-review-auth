import {Schema, model} from "mongoose";
import {TReview, TReviewModel} from "./review.interface";
import {Course} from "../Course/course.model";

const reviewSchema = new Schema<TReview>({
  courseId: {type: Schema.Types.ObjectId, required: true, ref: "Course"},
  rating: {type: Number, enum: [1, 2, 3, 4, 5], required: true},
  review: {type: String, required: true},
});

reviewSchema.statics.isCourseExists = async (id: string) => {
  const existingCourse = await Course.findById(id);
  return existingCourse;
};

export const Review = model<TReview, TReviewModel>("Review", reviewSchema);
