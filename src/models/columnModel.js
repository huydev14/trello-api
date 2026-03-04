import Joi from 'joi';
import { OBJECT_ID_RULE, OBJECT_ID_MESSAGE_RULE } from '~/utils/validators';

// Define collection schema
const COLUMN_COLLECTION_NAME = 'boards';
const COLUMN_COLLECTION_SCHEMA = Joi.object({
    boardId: Joi.required().string().pattern(OBJECT_ID_RULE).message(OBJECT_ID_MESSAGE_RULE),
    title: Joi.required().string().min(3).max(50).trim().strict(),

    cardOrderIds: Joi.array().items(Joi.string().pattern(OBJECT_ID_RULE).message(OBJECT_ID_MESSAGE_RULE)).default([]),

    createdAt: Joi.date().timestamp('javascript').default(Date.now),
    updatedAt: Joi.date().timestamp('javascript').default(null),
    _destroy: Joi.boolean().default(false),
}); 

export const boardModel = {
    COLUMN_COLLECTION_NAME,
    COLUMN_COLLECTION_SCHEMA,
};
