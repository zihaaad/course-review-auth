import {JwtPayload} from "jsonwebtoken";
import jwt from "jsonwebtoken";
import config from "../config";
import catchAsync from "../utilities/catchAsync";
import {NextFunction, Request, Response} from "express";
import {User} from "../modules/Auth/auth.model";

const auth = (userRole: string) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization;

    if (!token) {
      throw new Error("You are not Authorized");
    }

    const decoded = jwt.verify(
      token,
      config.jwt_access_secret as string
    ) as JwtPayload;

    const {email, role} = decoded;

    const user = await User.findOne({email});

    if (!user) {
      throw new Error("User is not found");
    }

    if (userRole !== role) {
      throw new Error("You are not Authorized ");
    }

    req.user = decoded as JwtPayload;
    next();
  });
};

export default auth;
