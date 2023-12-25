import {z} from "zod";

const categoryValidationSchema = z.object({
  body: z.object({
    name: z.string({
      required_error: "Category Name is required",
      invalid_type_error: "Category Name must be string",
    }),
  }),
});

export const categoryValidations = {
  categoryValidationSchema,
};
