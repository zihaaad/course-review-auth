import {CategoryServices} from "./category.service";
import catchAsync from "../../utilities/catchAsync";
import sendResponse from "../../utilities/sendResponse";

const createCategroy = catchAsync(async (req, res) => {
  const result = await CategoryServices.createCategroy(req.body);

  sendResponse(res, {
    statusCode: 201,
    message: "Category created successfully",
    data: result,
  });
});

const getAllCategories = catchAsync(async (req, res) => {
  const result = await CategoryServices.getAllCategories();
  sendResponse(res, {
    statusCode: 200,
    message: "Categories retrived successfully",
    data: result,
  });
});

export const CategoryControllers = {
  createCategroy,
  getAllCategories,
};
