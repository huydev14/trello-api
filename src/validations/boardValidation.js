import Joi from 'joi';
import { StatusCodes } from 'http-status-codes';
import ApiError from '~/utils/ApiError';

const createNew = async (req, res, next) => {
    const schema = Joi.object({
        title: Joi.string().required().min(3).max(50).trim().strict().messages({
            'any.required': 'Title is required',
            'string.empty': 'Title is not allowed to be empty',
            'string.max': 'Title max 50 chars',
            'string.min': 'Title min 3 chars',
            'string.trim': 'Title must not have leading or trailing whitespace',
        }),
        description: Joi.string().required().min(3).max(256).trim().strict(),
    });

    try {
        await schema.validateAsync(req.body, { abortEarly: false });
        next();
    } catch (error) {
        const errorMessage = new Error(error).message;
        const customError = new ApiError(StatusCodes.UNPROCESSABLE_ENTITY, errorMessage);
        next(customError);
    }
};

export const boardValidation = {
    createNew,
};
