import {ReviewServices} from "./review.service";
import catchAsync from "../../utilities/catchAsync";
import sendResponse from "../../utilities/sendResponse";

const createReview = catchAsync(async (req, res) => {
  const result = await ReviewServices.createReview(req.body);

  sendResponse(res, {
    statusCode: 201,
    message: "Review created successfully",
    data: result,
  });
});

export const ReviewControllers = {
  createReview,
};
