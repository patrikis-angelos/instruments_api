import Instrument from '../entities/Instrument.js';
import { dataSource } from '../startup/db.js';
import ApiError from '../errors/ApiError.js';

class InstrumentService {
  instrumentService = dataSource.getRepository(Instrument);

  async getInstruments() {
    return await this.instrumentService.find();
  }

  async getInstrument(id) {
    return await this.instrumentService.findOneBy({ id });
  }

  async createInstrument(instrument) {
    return await this.instrumentService.save(instrument);
  }

  async updateInstrument(id, instrument) {
    instrument.updatedAt = new Date();
    const result = await this.instrumentService.update(id, instrument);
    if (result.affected) return { message: `Instrument ${id} updated` };

    throw ApiError.notFound(`Insrument ${id} not found`);
  }

  async deleteInstrument(id) {
    const result =  await this.instrumentService.delete(id);
    if (result.affected) return { message: `Instrument ${id} deleted`};

    throw ApiError.notFound(`Insrument ${id} not found`);
  }
}

export default new InstrumentService();
