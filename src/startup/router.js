import express from 'express';
import homeRouter from '../routes/home.js';

const router = express.Router();

router.use('/', homeRouter);

export default router;
