import { dataSource } from '../../src/startup/db.js';
import Category from '../../src/entities/Category.js';
import Instrument from '../../src/entities/Instrument.js';

export default async () => {
  const categoryRepository = dataSource.getRepository(Category);
  const instrumentRepository = dataSource.getRepository(Instrument);

  const categoryIds = (await categoryRepository.find()).map((category) => category.id);
  const instrumentIds = (await instrumentRepository.find()).map((instrument) => instrument.id);

  await categoryRepository.delete(categoryIds);
  await instrumentRepository.delete(instrumentIds);
};
