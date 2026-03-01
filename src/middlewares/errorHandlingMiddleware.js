import { StatusCodes } from 'http-status-codes';

export const errorHandlingMiddleware = (err, req, res, next) => {
    // Default error status 500
    if (!err.StatusCode) err.statusCode = StatusCodes.INTERNAL_SERVER_ERROR;

    const responseError = {
        statusCode: err.statusCode,
        message: err.message || StatusCodes[err.statusCode],
        stack: err.stack,
    };

    res.status(responseError.statusCode).json(responseError);
};
