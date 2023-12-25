/* eslint-disable no-unused-vars */
import {Model} from "mongoose";
import {Types} from "mongoose";

export type TReview = {
  courseId: Types.ObjectId;
  rating: 1 | 2 | 3 | 4 | 5;
  review: string;
};

export interface TReviewModel extends Model<TReview> {
  isCourseExists(id: string): Promise<TReview | null>;
}
