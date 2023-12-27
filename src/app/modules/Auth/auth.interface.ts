export interface IRegisterUser {
  username: string;
  email: string;
  password: string;
  role: "admin" | "user";
}
