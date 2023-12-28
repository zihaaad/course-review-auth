import catchAsync from "../../utilities/catchAsync";
import sendResponse from "../../utilities/sendResponse";
import {AuthServices} from "./auth.service";

const createUser = catchAsync(async (req, res) => {
  const result = await AuthServices.createUser(req.body);

  sendResponse(res, {
    statusCode: 201,
    message: "User registered successfully",
    data: result,
  });
});

const loginUser = catchAsync(async (req, res) => {
  const result = await AuthServices.loginUser(req.body);

  sendResponse(res, {
    statusCode: 200,
    message: "User login successful",
    data: result,
  });
});

const changePassword = catchAsync(async (req, res) => {
  const {currentPassword, newPassword} = req.body;
  const result = await AuthServices.changePassword(
    req.user,
    currentPassword,
    newPassword
  );

  res.json(result);
});

export const AuthControllers = {
  createUser,
  loginUser,
  changePassword,
};
