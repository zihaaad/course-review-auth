/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import {ErrorRequestHandler} from "express";
import {JsonWebTokenError} from "jsonwebtoken";
import {ZodError} from "zod";

const globalErrorHandler: ErrorRequestHandler = (err, req, res, next) => {
  let message;
  let errorMessage;
  let errorDetails = err;
  let stack = err.stack;

  if (err instanceof ZodError) {
    message = "Validation Error";
    if (err?.issues) {
      errorMessage = err.issues.map((issue) => issue.message).join(". ");
    }
  } else if (err?.name === "ValidationError") {
    message = "Validation Error";
    errorMessage = err?.message;
  } else if (err?.name === "CastError") {
    message = "Invalid ID";
    errorMessage = `${err.value} is not a valid ID!`;
  } else if (err?.code === 11000) {
    message = "Duplicate Entry";
    const match = err.message.match(/"([^"]*)"/);
    const extractedMsg = match && match[1];
    errorMessage = `${extractedMsg} is already exists`;
  } else if (err instanceof JsonWebTokenError) {
    message = "Unauthorized Access";
    errorMessage =
      "You do not have the necessary permissions to access this resource.";
    errorDetails = null;
    stack = null;
  } else if (err instanceof Error) {
    message = "Something went Wrong!";
    errorMessage = err?.message;
  }

  return res.status(500).json({
    success: false,
    message,
    errorMessage,
    errorDetails,
    stack,
  });
};

export default globalErrorHandler;
