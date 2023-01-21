import { dataSource } from '../../src/startup/db';
import Category from '../../src/entities/Category';
import categories from './categories';

export const seedDatabase = async () => {
  const categoryRepository = dataSource.getRepository(Category);
  await categoryRepository.save(categories);
};

export const clearDatabase = async () => {
  const categoryRepository = dataSource.getRepository(Category);
  await categoryRepository.clear();
};
