import express from 'express';
import homeRouter from '../routes/home.js';
import categoryRouter from '../routes/category.js';

const router = express.Router();

router.use('/', homeRouter);
router.use('/category', categoryRouter);

export default router;
