import Category from '../entities/Category.js';
import { dataSource } from '../startup/db.js';
import ApiError from '../errors/ApiError.js';

class CategoryService {
  categoryRepository = dataSource.getRepository(Category);

  async getCategories() {
    return await this.categoryRepository.find();
  }

  async getCategory(id) {
    return await this.categoryRepository.findOneBy({ id });
  }

  async createCategory(category) {
    return await this.categoryRepository.save(category);
  }

  async updateCategory(id, category) {
    category.updatedAt = new Date();
    const result = await this.categoryRepository.update(id, category);
    if (result.affected) return { message: `Category ${id} updated` };

    throw ApiError.notFound(`Category ${id} not found`);
  }

  async deleteCategory(id) {
    const result =  await this.categoryRepository.delete(id);
    if (result.affected) return { message: `Category ${id} deleted`};

    throw ApiError.notFound(`Category ${id} not found`);
  }
}

export default new CategoryService();
