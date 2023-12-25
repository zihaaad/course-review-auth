import {z} from "zod";

const tagSchema = z.object({
  name: z.string({
    required_error: "Name is required",
    invalid_type_error: "Name must be string",
  }),
  isDeleted: z.boolean().default(false),
});

const courseDetailsSchema = z.object({
  level: z.string({
    required_error: "Level is required",
    invalid_type_error: "Level must be string",
  }),
  description: z.string({
    required_error: "Description is required",
    invalid_type_error: "Description must be string",
  }),
});

export const courseSchema = z.object({
  body: z.object({
    title: z.string({
      required_error: "Title is required",
      invalid_type_error: "Title must be string",
    }),
    instructor: z.string({
      required_error: "Instructor is required",
      invalid_type_error: "Instructor must be string",
    }),
    categoryId: z.string({
      required_error: "categoryId is required",
      invalid_type_error: "categoryId must be string",
    }),
    price: z
      .number({
        required_error: "Price is required",
        invalid_type_error: "Price must be number",
      })
      .positive(),
    tags: z.array(tagSchema),
    startDate: z.string({
      required_error: "startDate is required",
      invalid_type_error: "startDate must be string",
    }),
    endDate: z.string({
      required_error: "endDate is required",
      invalid_type_error: "endDate must be string",
    }),
    language: z.string({
      required_error: "Language is required",
      invalid_type_error: "Language must be string",
    }),
    provider: z.string({
      required_error: "Provider is required",
      invalid_type_error: "Provider must be string",
    }),
    durationInWeeks: z.number().int().positive().optional(),
    details: courseDetailsSchema,
  }),
});

const updateTagSchema = z.object({
  name: z
    .string({
      required_error: "Name is required",
      invalid_type_error: "Name must be string",
    })
    .optional(),
  isDeleted: z.boolean().default(false).optional(),
});

const updateCourseDetailsSchema = z.object({
  level: z
    .string({
      required_error: "Level is required",
      invalid_type_error: "Level must be string",
    })
    .optional(),
  description: z
    .string({
      required_error: "Description is required",
      invalid_type_error: "Description must be string",
    })
    .optional(),
});

export const updateCourseSchema = z.object({
  body: z.object({
    title: z
      .string({
        required_error: "Title is required",
        invalid_type_error: "Title must be string",
      })
      .optional(),
    instructor: z
      .string({
        required_error: "Instructor is required",
        invalid_type_error: "Instructor must be string",
      })
      .optional(),
    categoryId: z
      .string({
        required_error: "categoryId is required",
        invalid_type_error: "categoryId must be string",
      })
      .optional(),
    price: z
      .number({
        required_error: "Price is required",
        invalid_type_error: "Price must be number",
      })
      .positive()
      .optional(),
    tags: z.array(updateTagSchema).optional(),
    startDate: z
      .string({
        required_error: "startDate is required",
        invalid_type_error: "startDate must be string",
      })
      .optional(),
    endDate: z
      .string({
        required_error: "endDate is required",
        invalid_type_error: "endDate must be string",
      })
      .optional(),
    language: z
      .string({
        required_error: "Language is required",
        invalid_type_error: "Language must be string",
      })
      .optional(),
    provider: z
      .string({
        required_error: "Provider is required",
        invalid_type_error: "Provider must be string",
      })
      .optional(),
    durationInWeeks: z.number().int().positive().optional(),
    details: updateCourseDetailsSchema.optional(),
  }),
});
