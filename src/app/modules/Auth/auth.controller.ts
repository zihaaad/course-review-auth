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

export const AuthControllers = {
  createUser,
};
