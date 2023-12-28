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
      .min(8, {message: "Password must be at least 8 characters long"})
      .max(20, {message: "Password can not be more than 20 characters"})
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        {
          message:
            "Password must include at least one lowercase letter, one uppercase letter, one digit, and one special character",
        }
      ),
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
