import {TCategory} from "./category.interface";
import {Category} from "./category.model";

const createCategroy = async (payload: TCategory) => {
  const result = await Category.create(payload);
  return result;
};

const getAllCategories = async () => {
  const result = await Category.find().select("-__v");
  return result;
};

export const CategoryServices = {
  createCategroy,
  getAllCategories,
};
