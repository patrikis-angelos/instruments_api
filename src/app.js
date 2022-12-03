import express from 'express';
import dbConnect from './startup/db.js';

const app = express();

// TODO: Ignore rule in eslintrc
//eslint-disable-next-line
await dbConnect();

app.use('/', (req, res) => {
  res.send('Hello world');
});


export default app;
