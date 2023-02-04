import dbConnect, { dataSource } from '../../src/startup/db.js';
import Category from '../../src/entities/Category.js';
import categories from './categories.js';
import Instrument from '../../src/entities/Instrument.js';
import instruments from './instruments.js';


export default async () => {
  await dbConnect();
  const categoryRepository = dataSource.getRepository(Category);
  const instrumentRepository = dataSource.getRepository(Instrument);

  await categoryRepository.save(categories);
  await instrumentRepository.save(instruments);
};
