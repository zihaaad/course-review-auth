import {JwtPayload} from "jsonwebtoken";
import {TCategory} from "./category.interface";
import {Category} from "./category.model";
import {User} from "../Auth/auth.model";

const createCategroy = async (user: JwtPayload, payload: TCategory) => {
  const {_id} = user;
  const userData = await User.findById(_id).select("_id");

  if (userData) {
    payload.createdBy = userData?._id;
  }

  const result = await Category.create(payload);
  return result;
};

const getAllCategories = async () => {
  const result = await Category.find()
    .select("-__v")
    .populate("createdBy", "_id username email role");
  return result;
};

export const CategoryServices = {
  createCategroy,
  getAllCategories,
};
