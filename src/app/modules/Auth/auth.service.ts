/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import config from "../../config";
import {IJwtPayload, ILoginUser, IRegisterUser} from "./auth.interface";
import bcrypt from "bcrypt";
import {User} from "./auth.model";
import {createAccessToken} from "./auth.utils";

const createUser = async (payload: IRegisterUser) => {
  payload.password = await bcrypt.hash(
    payload.password,
    Number(config.bcrypt_salt_rounds)
  );
  const saveUser = await User.create(payload);
  const result = await User.findById(saveUser._id);

  return result;
};

const loginUser = async (payload: ILoginUser) => {
  const user = await User.findOne({username: payload.username}).select(
    "+password"
  );

  if (!user) {
    throw new Error("User is not found!");
  }

  const isPasswordMatched = await bcrypt.compare(
    payload.password,
    user.password
  );

  if (!isPasswordMatched) {
    throw new Error("Password doesn't match!");
  }

  const jwtPayload: IJwtPayload = {
    username: user.username,
    email: user.email,
    role: user.role,
  };

  const accessToken = createAccessToken(
    jwtPayload,
    config.jwt_access_secret as string,
    config.jwt_access_expires_in as string
  );

  const {_id, username, email, role} = user.toObject();

  const result = {
    user: {_id, username, email, role},
    token: accessToken,
  };

  return result;
};

export const AuthServices = {
  createUser,
  loginUser,
};
