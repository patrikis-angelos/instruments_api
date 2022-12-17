import express from 'express';
import dbConnect from './startup/db.js';
import router from './startup/router.js';

const app = express();

await dbConnect();

app.use(express.json());
app.use(router);

export default app;
