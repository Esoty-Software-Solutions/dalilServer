import messageUtil from "./message.js";
import { StatusCodes, getReasonPhrase } from "http-status-codes";

const successResponse = (res, message, data, dataCount, token) => {
  const response = {
    statusCode: StatusCodes.OK,
    success: true,
    message,
  };
  if (token) response.token = token;
  if (dataCount) response.dataCount = dataCount;
  if (data) response.data = data;
  res.status(StatusCodes.OK).send(response);
};

const serverErrorResponse = (res, error) => {
  res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({
    statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
    success: false,
    error: error.toString(),
    message: messageUtil.serverError,
  });
};

const validationErrorResponse = (res, errors) => {
  res.status(StatusCodes.NON_AUTHORITATIVE_INFORMATION).json({
    success: false,
    error: errors,
    message: messageUtil.validationErrors,
  });
};

const badRequestErrorResponse = (res, message) => {
  res.status(StatusCodes.BAD_REQUEST).send({
    statusCode: StatusCodes.BAD_REQUEST,
    success: false,
    message,
  });
};

const userExistResponse = (res, message) => {
  res.status(StatusCodes.OK).send({
    statusCode: StatusCodes.OK,
    success: false,
    message,
  });
};

const existAlreadyResponse = (res, message) => {
  res.status(StatusCodes.CONFLICT).send({
    success: false,
    message,
  });
};

const notFoundResponse = (res, message) => {
  res.status(StatusCodes.NOT_FOUND).send({
    statusCode: StatusCodes.NOT_FOUND,
    success: false,
    message,
  });
};

const authorizationErrorResponse = (res, message) => {
  res.status(StatusCodes.UNAUTHORIZED).send({
    success: false,
    message,
  });
};

const manyRequestErrorResponse = (res, message) => {
  res.status(StatusCodes.TOO_MANY_REQUESTS).send({
    success: false,
    message,
  });
};

export {
  successResponse,
  serverErrorResponse,
  validationErrorResponse,
  badRequestErrorResponse,
  userExistResponse,
  existAlreadyResponse,
  notFoundResponse,
  authorizationErrorResponse,
  manyRequestErrorResponse,
};
