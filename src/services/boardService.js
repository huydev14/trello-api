/* eslint-disable no-useless-catch */
import { slugify } from '~/utils/formatters';
import { boardModel } from '~/models/boardModel';

const createNew = async (reqBody) => {
    try {
        const data = {
            ...reqBody,
            slug: slugify(reqBody.title),
        };

        // Insert new document to db
        const createdBoard = await boardModel.createNew(data);
        console.log(createdBoard);

        // Get created document
        const getNewBoard = await boardModel.findOneById(createdBoard.insertedId);
        console.log(getNewBoard);

        return getNewBoard;
    } catch (error) {
        throw error;
    }
};

export const boardService = {
    createNew,
};
