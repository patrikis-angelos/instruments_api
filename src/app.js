import express from 'express';
import dbConnect from './startup/db.js';

const app = express();
await dbConnect();

app.use('/', (req, res) => {
  res.send('Hello world');
});


export default app;
