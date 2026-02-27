import Joi from 'joi';

import { StatusCodes } from 'http-status-codes';

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
        console.log(req.body);
        await schema.validateAsync(req.body, { abortEarly: false });
        res.status(StatusCodes.CREATED).json({ message: 'POST: API create new board' });
    } catch (error) {
        console.log(error);
        res.status(StatusCodes.UNPROCESSABLE_ENTITY).json({
            errors: new Error(error).message,
        });
    }
};

export const boardValidation = {
    createNew,
};
