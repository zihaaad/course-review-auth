import {USER_ROLE} from "./auth.utils";

export type TPasswordHistory = {
  password: string;
  timestamp: Date;
};

export interface IRegisterUser {
  username: string;
  email: string;
  password: string;
  role: "admin" | "user";
  passwordHistory?: TPasswordHistory[];
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
