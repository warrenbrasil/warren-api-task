const httpStatus = require("http-status");
const { ValidationError } = require("yup");
const ERROR_MESSAGE = require("../utils/messages/error-messages");
const { CustomError } = require('./CustomError')
const { NotFoundError } = require('./NotFoundError')


const errorHandler = (
  error,
  request,
  response,
  next
) => {
  console.log({ error })
  switch (error.constructor) {
    case ValidationError:
      let errors = {};
      error.inner.forEach((err) => {
        if (err.path) errors[err.path] = err.errors;
      });

      return response
        .status(400)
        .json({ message: ValidateError.VALIDATION_ERROR, errors });

    case CustomError:
      return response.status(error.status).json({ message: error.message });

    case NotFoundError:
      return response.status(error.status).json({ message: error.message });

    default: {
      console.error(error);
      return response
        .status(httpStatus.INTERNAL_SERVER_ERROR)
        .json({ message: ERROR_MESSAGE.INTERNAL_SERVER_ERROR });
    }
  }
};

module.exports = {
  errorHandler
}