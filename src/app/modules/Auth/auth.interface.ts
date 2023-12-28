import {USER_ROLE} from "./auth.utils";

export interface IRegisterUser {
  username: string;
  email: string;
  password: string;
  role: "admin" | "user";
}

export interface ILoginUser {
  username: string;
  password: string;
}

export interface IJwtPayload {
  username: string;
  email: string;
  role: string;
}

export type TUserRole = keyof typeof USER_ROLE;
