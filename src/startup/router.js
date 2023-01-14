import express from 'express';
import homeRouter from '../routes/home.js';

const router = express.Router();

router.use('/', homeRouter);
router.use((req, res) => { res.status(404).json({ message: 'Not Found' }); });

export default router;
