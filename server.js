import express from "express";
import { connectMongodb } from "./config/dbconfig.js";
import routers from "./routers/index.js";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const port = process.env.PORT || 3000;
const url = process.env.DB_URL || "mongodb://localhost:27017/nodejs-xuong";
app.listen(port, () => {
  connectMongodb(url);
  console.log(`Endpoint http://localhost:${port}`);
});
routers(app);

export const viteNodeApp = app;
