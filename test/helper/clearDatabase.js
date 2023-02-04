import { dataSource } from '../../src/startup/db.js';
import Category from '../../src/entities/Category.js';
import Instrument from '../../src/entities/Instrument.js';

export default async () => {
  const categoryRepository = dataSource.getRepository(Category);
  const instrumentRepository = dataSource.getRepository(Instrument);

  await categoryRepository.clear();
  await instrumentRepository.clear();
};
