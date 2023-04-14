const messageUtil = require("./message.js");
const { StatusCodes, getReasonPhrase } = require("http-status-codes");

const successResponse = (res, message, data, dataCount, token) => {
  const response = {
    statusCode: StatusCodes.OK,
    success: true,
    message,
  };
  if (token) response.token = token;
  if (dataCount) {
    let objData = {
      objectCount: dataCount,
      objectArray: data,
    };
    response.data = objData;

    // response.data.objectCount = dataCount;
    // response.data.objectArray = data;
  } else if (data) {
    response.data = data;
  }
  return res.status(StatusCodes.OK).send(response);
};

const serverErrorResponse = (res, error) => {
  console.log(error);
  res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({
    statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
    success: false,
    error: error.toString(),
    message: messageUtil.serverError,
  });
};

const validationErrorResponse = (res, errors) => {
  console.log(errors);
  res.status(StatusCodes.NON_AUTHORITATIVE_INFORMATION).json({
    success: false,
    error: errors,
    message: messageUtil.validationErrors,
  });
};

const badRequestErrorResponse = (res, message) => {
  console.log(error);
  res.status(StatusCodes.BAD_REQUEST).send({
    statusCode: StatusCodes.BAD_REQUEST,
    success: false,
    message,
  });
};

const userExistResponse = (res, message) => {
  console.log(message);
  res.status(StatusCodes.OK).send({
    statusCode: StatusCodes.OK,
    success: false,
    message,
  });
};

const existAlreadyResponse = (res, message) => {
  console.log(message);
  res.status(StatusCodes.CONFLICT).send({
    success: false,
    message,
  });
};

const notFoundResponse = (res, message) => {
  console.log(message);
  res.status(StatusCodes.NOT_FOUND).send({
    statusCode: StatusCodes.NOT_FOUND,
    success: false,
    message,
  });
};

const authorizationErrorResponse = (res, message) => {
  console.log(message);
  res.status(StatusCodes.UNAUTHORIZED).send({
    success: false,
    message,
  });
};

const manyRequestErrorResponse = (res, message) => {
  console.log(message);
  res.status(StatusCodes.TOO_MANY_REQUESTS).send({
    success: false,
    message,
  });
};

module.exports = {
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
