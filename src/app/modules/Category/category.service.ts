import {JwtPayload} from "jsonwebtoken";
import {TCategory} from "./category.interface";
import {Category} from "./category.model";
import {User} from "../Auth/auth.model";

const createCategroy = async (user: JwtPayload, payload: TCategory) => {
  const {username, email} = user;
  const userData = await User.findOne({
    username,
    email,
  }).select("_id");

  if (userData) {
    payload.createdBy = userData?._id;
  }

  const result = await Category.create(payload);
  return result;
};

const getAllCategories = async () => {
  const result = await Category.find().select("-__v").populate("createdBy");
  return result;
};

export const CategoryServices = {
  createCategroy,
  getAllCategories,
};
