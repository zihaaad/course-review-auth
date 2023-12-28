/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import config from "../../config";
import {
  IJwtPayload,
  ILoginUser,
  IRegisterUser,
  TPasswordHistory,
} from "./auth.interface";
import bcrypt from "bcrypt";
import {User} from "./auth.model";
import {createAccessToken} from "./auth.utils";
import {JwtPayload} from "jsonwebtoken";

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

const changePassword = async (
  user: JwtPayload,
  currentPassword: string,
  newPassword: string
) => {
  const {username, email, role} = user;
  const userData = await User.findOne({username, email, role}).select(
    "+password +passwordHistory"
  );

  const isCurrentAndNewPasswordSame =
    userData?.password &&
    (await bcrypt.compare(newPassword, userData.password));

  const isPasswordMatched =
    userData?.password &&
    (await bcrypt.compare(currentPassword, userData.password));

  if (!isPasswordMatched) {
    throw new Error("Current password is wrong!");
  }

  if (isCurrentAndNewPasswordSame) {
    throw new Error("Current password & new password can't be same!");
  }

  const isSameAsPreviousTwoPasswords =
    userData?.passwordHistory?.some((previous) =>
      bcrypt.compareSync(newPassword, previous.password)
    ) ||
    (userData?.password && bcrypt.compareSync(newPassword, userData.password));

  if (isSameAsPreviousTwoPasswords) {
    const lastUsedTimestamp =
      userData?.passwordHistory &&
      userData.passwordHistory.length > 0 &&
      userData.passwordHistory[0].timestamp;

    return {
      success: false,
      statusCode: 400,
      message: `Password change failed. Ensure the new password is unique and not among the last 2 used (last used on ${lastUsedTimestamp}).`,
      data: null,
    };
  }

  const hashedNewPassword = await bcrypt.hash(
    newPassword,
    Number(config.bcrypt_salt_rounds)
  );

  const result = await User.findByIdAndUpdate(userData?._id, {
    password: hashedNewPassword,
  });

  if (result && userData) {
    const previousPassword: TPasswordHistory = {
      password: userData.password,
      timestamp: new Date(),
    };

    userData.passwordHistory?.unshift(previousPassword);
    userData.passwordHistory?.splice(2);

    await userData.save();
  }

  return {
    success: true,
    statusCode: 200,
    message: "Password changed successfully",
    data: result,
  };
};

export const AuthServices = {
  createUser,
  loginUser,
  changePassword,
};
