import express from "express";
import exitHook from "async-exit-hook";
import { CONNECT_DB, CLOSE_DB } from "~/config/mongodb";
import { env } from "~/config/environment";

const START_SERVER = () => {
  const app = express();

  app.get("/", (req, res) => {
    res.end(`<h1>Hello World!</h1><hr>`);
  });

  app.listen(env.APP_PORT, env.APP_HOST, async () => {
    console.log(`Server is running at http://${env.APP_HOST}:${env.APP_PORT}/`);
  });

  exitHook((done) => {
    console.log("Disconnecting from MongoDB Cloud Atlas!");
    CLOSE_DB().then(() => done());
  });
};

(async () => {
  try {
    await CONNECT_DB();
    console.log("Connected to MongoDB Cloud Atlas!");
    START_SERVER();
  } catch (error) {
    console.error(error);
    process.exit(0);
  }
})();
