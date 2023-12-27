import config from "../../config";
import {IRegisterUser} from "./auth.interface";
import bcrypt from "bcrypt";
import {User} from "./auth.model";

const createUser = async (payload: IRegisterUser) => {
  payload.password = await bcrypt.hash(
    payload.password,
    Number(config.bcrypt_salt_rounds)
  );
  const saveUser = await User.create(payload);
  const result = await User.findById(saveUser._id);

  return result;
};

export const AuthServices = {
  createUser,
};
