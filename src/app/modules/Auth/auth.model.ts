import {Schema, model} from "mongoose";
import {IRegisterUser} from "./auth.interface";

const createUserSchema = new Schema<IRegisterUser>(
  {
    username: {
      type: String,
      trim: true,
      unique: true,
      required: true,
    },
    email: {
      type: String,
      trim: true,
      lowercase: true,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
      select: 0,
    },
    role: {
      type: String,
      enum: ["admin", "user"],
      default: "user",
    },
    passwordHistory: {
      type: [
        {
          password: String,
          timestamp: Date,
        },
      ],
      select: 0,
    },
  },
  {timestamps: true}
);

export const User = model<IRegisterUser>("User", createUserSchema);
