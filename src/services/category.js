import Category from '../entities/Category.js';
import { dataSource } from '../startup/db.js';

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
    return await this.categoryRepository.update(id, category);
  }

  async deleteCategory(id) {
    return await this.categoryRepository.delete(id);
  }
}

export default new CategoryService();
