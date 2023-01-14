import express from 'express';
import 'express-async-errors';
import morgan from './middleware/morgan.js';
import dbConnect from './startup/db.js';
import router from './startup/router.js';
import error from './middleware/error.js';

const app = express();

await dbConnect();

app.use(morgan);
app.use(express.json());
app.use(router);
app.use(error);

export default app;
