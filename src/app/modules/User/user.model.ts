import {Schema, model} from "mongoose";
import {IUser} from "./user.interface";

const userSchema = new Schema<IUser>({
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
  },
  role: {
    type: String,
    enum: ["admin", "user"],
    default: "user",
  },
});

export const User = model<IUser>("User", userSchema);
