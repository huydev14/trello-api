import express from 'express';
import exitHook from 'async-exit-hook';
import { CONNECT_DB, CLOSE_DB } from '~/config/mongodb';
import { env } from '~/config/environment';
import { API_V1 } from '~/routes/v1';
import { StatusCodes } from 'http-status-codes';
import { errorHandlingMiddleware } from '~/middlewares/errorHandlingMiddleware';

const START_SERVER = () => {
    const app = express();

    // Enable req.body json data
    app.use(express.json());

    // Route v1
    app.use('/v1', API_V1);

    // Error handler
    app.use(errorHandlingMiddleware);

    app.listen(env.APP_PORT, env.APP_HOST, () => {
        console.log(`Server is running at http://${env.APP_HOST}:${env.APP_PORT}/`);
    });

    exitHook((done) => {
        console.log('Disconnecting from MongoDB Cloud Atlas!');
        CLOSE_DB().then(() => done());
    });
};

(async () => {
    try {
        await CONNECT_DB();
        console.log('Connected to MongoDB Cloud Atlas!');
        START_SERVER();
    } catch (error) {
        console.error(error);
        process.exit(0);
    }
})();
