import {z} from "zod";

const createUserValidationSchema = z.object({
  body: z.object({
    username: z.string({
      required_error: "Username is required",
      invalid_type_error: "Username must be string",
    }),
    email: z.string({
      required_error: "Email is required",
      invalid_type_error: "Email must be string",
    }),
    password: z
      .string({
        required_error: "Password is required",
        invalid_type_error: "Password must be string",
      })
      .max(20, {message: "Password can not be more than 20 characters"}),
    role: z.enum(["admin", "user"]).default("user"),
  }),
});

const loginUserValidationSchema = z.object({
  body: z.object({
    username: z.string({
      required_error: "Username is required",
      invalid_type_error: "Username must be string",
    }),
    password: z.string({
      required_error: "Password is required",
      invalid_type_error: "Password must be string",
    }),
  }),
});

export const AuthValidations = {
  createUserValidationSchema,
  loginUserValidationSchema,
};
