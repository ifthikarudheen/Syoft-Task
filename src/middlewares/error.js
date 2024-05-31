import httpStatus from 'http-status';
import  db from '../models/index.cjs';
const {sequelize} = db;
 // Assuming Sequelize models are defined in '../models'
import ApiError from '../utils/ApiError.js';

export const errorConverter = (err, req, res, next) => {
  let error = err;
  if (!(error instanceof ApiError)) {
    const statusCode =
      error.statusCode || error instanceof sequelize.Error
        ? httpStatus.BAD_REQUEST
        : httpStatus.INTERNAL_SERVER_ERROR;
    const message = error.message || httpStatus[statusCode];
    error = new ApiError(statusCode, message, false, err.stack);
  }
  next(error);
};

export const errorHandler = (err, req, res, next) => {
  let { statusCode, message } = err;
  // Assuming you want to treat all errors as operational errors
  if (!err.isOperational) {
    statusCode = httpStatus.INTERNAL_SERVER_ERROR;
    message = httpStatus[httpStatus.INTERNAL_SERVER_ERROR];
  }

  res.locals.errorMessage = err.message;

  const response = {
    code: statusCode,
    message,
    // Omitting stack trace in production
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  };

  // Logging errors in development
  if (process.env.NODE_ENV === 'development') {
    console.error(err);
  }

  res.status(statusCode).send(response);
};
