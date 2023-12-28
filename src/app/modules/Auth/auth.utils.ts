import {IJwtPayload} from "./auth.interface";
import jwt from "jsonwebtoken";

export const USER_ROLE = {
  admin: "admin",
  user: "user",
} as const;

export const createAccessToken = (
  jwtPayload: IJwtPayload,
  secret: string,
  expiresIn: string
) => {
  return jwt.sign(jwtPayload, secret, {expiresIn});
};
