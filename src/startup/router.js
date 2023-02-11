import express from 'express';
import homeRouter from '../routes/home.js';
import categoryRouter from '../routes/category.js';
import instrumentRouter from '../routes/instrument.js';

const router = express.Router();

router.use('/', homeRouter);
router.use('/category', categoryRouter);
router.use('/instrument', instrumentRouter);
router.use((req, res) => { res.status(404).json({ message: 'Not Found' }); });

export default router;
