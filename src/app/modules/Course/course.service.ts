import {TCourse} from "./course.interface";
import moment from "moment";
import {Course} from "./course.model";
import {Review} from "../Review/review.model";

const createCourse = async (payload: TCourse) => {
  if (!(await Course.isCategoryExists(String(payload.categoryId)))) {
    throw new Error("CategoryId is not Valid.");
  }
  const endDate = moment(payload.endDate);
  const startDate = moment(payload.startDate);

  const weeksDuration: number = Math.ceil(
    endDate.diff(startDate, "weeks", true)
  );
  payload.durationInWeeks = weeksDuration;

  const result = await Course.create(payload);
  return result;
};

const getAllCourses = async (query: Record<string, unknown>) => {
  const page = Number(query?.page) || 1;
  const limit = Number(query?.limit) || 10;
  const skip = (page - 1) * limit;

  const allowedSortByFields = [
    "title",
    "price",
    "startDate",
    "endDate",
    "language",
    "durationInWeeks",
  ];

  const sortBy = allowedSortByFields.includes(query.sortBy as string)
    ? (query.sortBy as string)
    : "title";

  // Query Object
  const queryObj: Record<string, unknown> = {};

  if (query.minPrice || query.maxPrice) {
    queryObj.price = {};
    if (query.minPrice) {
      (queryObj.price as Record<string, number>).$gte = parseFloat(
        String(query.minPrice)
      );
    }
    if (query.maxPrice) {
      (queryObj.price as Record<string, number>).$lte = parseFloat(
        String(query.maxPrice)
      );
    }
  }

  if (query.tags) {
    queryObj["tags.name"] = query.tags;
  }

  if (query.startDate && query.endDate) {
    queryObj.startDate = {$gte: query.startDate, $lte: query.endDate};
    queryObj.endDate = {$gte: query.startDate, $lte: query.endDate};
  }

  if (query.language) {
    queryObj.language = query.language;
  }

  if (query.provider) {
    queryObj.provider = query.provider;
  }

  if (query.durationInWeeks) {
    queryObj.durationInWeeks = query.durationInWeeks;
  }

  if (query.level) {
    queryObj["details.level"] = query.level;
  }

  const course = await Course.find(queryObj)
    .skip(skip)
    .limit(limit)
    .sort(sortBy);

  const result = {
    meta: {page, limit, total: course.length},
    course,
  };

  return result;
};

const updateCourse = async (id: string, payload: Partial<TCourse>) => {
  const {details, tags, ...remainingCourseData} = payload;

  const endDate = moment(payload.endDate);
  const startDate = moment(payload.startDate);

  const weeksDuration: number = Math.ceil(
    endDate.diff(startDate, "weeks", true)
  );

  remainingCourseData.durationInWeeks = weeksDuration;

  const modifiedData: Record<string, unknown> = {
    ...remainingCourseData,
  };

  if (
    remainingCourseData.categoryId &&
    !(await Course.isCategoryExists(String(remainingCourseData.categoryId)))
  ) {
    throw new Error("CategoryId is not a Valid ID.");
  }

  if (!(await Course.isCourseExists(id))) {
    throw new Error("Course Doesn't Exists.");
  }

  if (details && Object.keys(details).length) {
    for (const [key, value] of Object.entries(details)) {
      modifiedData[`details.${key}`] = value;
    }
  }

  await Course.findByIdAndUpdate(id, modifiedData);

  if (tags && tags.length > 0) {
    const deletedTags = tags
      .filter((element) => element.name && element.isDeleted)
      .map((element) => element.name);

    await Course.findByIdAndUpdate(id, {
      $pull: {tags: {name: {$in: deletedTags}}},
    });

    const newCourseTags = tags?.filter(
      (element) => element.name && !element.isDeleted
    );

    await Course.findByIdAndUpdate(id, {
      $addToSet: {tags: {$each: newCourseTags}},
    });
  }

  const result = await Course.findById(id);
  return result;
};

const courseWithReviews = async (courseId: string) => {
  if (!(await Course.isCourseExists(courseId))) {
    throw new Error("Course Doesn't Exists.");
  }
  const course = await Course.findById(courseId);
  const reviews = await Review.find({courseId});

  const result = {course, reviews};
  return result;
};

const bestCourse = async () => {
  const [result] = await Course.aggregate([
    {
      $lookup: {
        from: "reviews",
        localField: "_id",
        foreignField: "courseId",
        as: "reviews",
      },
    },
    {
      $addFields: {
        averageRating: {$avg: "$reviews.rating"},
        reviewCount: {$size: "$reviews"},
      },
    },
    {
      $sort: {averageRating: -1},
    },
    {
      $limit: 1,
    },
    {
      $project: {
        reviews: 0,
      },
    },
  ]);

  result.averageRating = Number(result?.averageRating?.toFixed(1));
  const {averageRating, reviewCount, ...course} = result;
  return {averageRating, reviewCount, course};
};

export const CourseServices = {
  createCourse,
  getAllCourses,
  updateCourse,
  bestCourse,
  courseWithReviews,
};
