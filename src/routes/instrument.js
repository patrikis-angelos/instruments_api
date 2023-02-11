import express from 'express';
import instrumentController from '../controllers/instrument.js';

const router = express.Router();

// /instrument
router.get('/', instrumentController.getInstruments);
router.get('/:id', instrumentController.getInstrument);
router.post('/', instrumentController.createInstrument);
router.put('/:id', instrumentController.updateInstrument);
router.delete('/:id', instrumentController.deleteInstrument);

export default router;
