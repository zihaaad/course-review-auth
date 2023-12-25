/* eslint-disable no-unused-vars */
import {Model, Types} from "mongoose";

export type TTag = {
  name: string;
  isDeleted: boolean;
};

export type TCourseDetails = {
  level: string;
  description: string;
};

export type TCourse = {
  title: string;
  instructor: string;
  categoryId: Types.ObjectId;
  price: number;
  tags: TTag[];
  startDate: string;
  endDate: string;
  language: string;
  provider: string;
  durationInWeeks?: number;
  details: TCourseDetails;
};

export interface CourseModel extends Model<TCourse> {
  isCategoryExists(id: string): Promise<TCourse | null>;
  isCourseExists(id: string): Promise<TCourse | null>;
}
