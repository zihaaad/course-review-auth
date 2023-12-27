import {IJwtPayload} from "./auth.interface";
import jwt from "jsonwebtoken";

export const createAccessToken = (
  jwtPayload: IJwtPayload,
  secret: string,
  expiresIn: string
) => {
  return jwt.sign(jwtPayload, secret, {expiresIn});
};
