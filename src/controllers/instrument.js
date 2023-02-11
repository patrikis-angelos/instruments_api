import instrumentService from '../services/instrument.js';
import Instrument from '../entities/Instrument.js';
import ApiError from '../errors/ApiError.js';
import { validateUuid } from '../validators/index.js';

class InstrumentController {
  async getInstruments(req, res) {
    const result = await instrumentService.getInstruments();
    res.json({ data: result });
  }

  async getInstrument(req, res, next) {
    validateUuid(req.params.id);
    const result = await instrumentService.getInstrument(req.params.id);
    if (!result) throw ApiError.notFound('Entity not found');
    res.json({ data: result });
  }

  async createInstrument(req, res) {
    const instrument = new Instrument(req.body);
    instrument.validate();
    const result = await instrumentService.createInstrument(instrument);
    res.json({ data: result });
  }

  async updateInstrument(req, res) {
    validateUuid(req.params.id);
    const instrument = new Instrument(req.body);
    instrument.validate();
    const result = await instrumentService.updateInstrument(req.params.id, instrument);
    res.json({ data: result });
  }

  async deleteInstrument(req, res) {
    validateUuid(req.params.id);
    const result = await instrumentService.deleteInstrument(req.params.id);
    res.json({ data: result });
  }
}

export default new InstrumentController();
