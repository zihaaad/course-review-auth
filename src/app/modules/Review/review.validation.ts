import {z} from "zod";

export const ReviewValidationSchema = z.object({
  body: z.object({
    courseId: z.string({
      required_error: "courseId is required",
      invalid_type_error: "courseId must be string",
    }),
    rating: z.number({
      required_error: "Rating is required",
      invalid_type_error: "Rating must be number",
    }),
    review: z.string({
      required_error: "review is required",
      invalid_type_error: "review must be string",
    }),
  }),
});
