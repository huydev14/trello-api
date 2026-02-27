import { MongoClient, ServerApiVersion } from 'mongodb';
import { env } from '~/config/environment';

let databaseInstance = null;

const client = new MongoClient(env.MONGODB_URI, {
    // Stable api
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    },
});

// Connect
export const CONNECT_DB = async () => {
    await client.connect();

    databaseInstance = client.db(env.DATABASE_NAME);
};

export const GET_DB = () => {
    if (!databaseInstance) throw new Error('Must connect to database first');
    return databaseInstance;
};

export const CLOSE_DB = async () => {
    await client.close();
};
