import categoryService from '../services/category.js';
import Category from '../models/Category.js';

class CategoryController {
  async getCategories(req, res) {
    const result = await categoryService.getCategories();
    res.json(result);
  }

  async getCategory(req, res) {
    const result = await categoryService.getCategory(req.params.id);
    res.json(result);
  }

  async createCategory(req, res) {
    const category = new Category(req.body);
    const result = await categoryService.createCategory(category);
    res.json(result);
  }

  async updateCategory(req, res) {
    const category = new Category(req.body);
    const result = await categoryService.updateCategory(req.params.id, category);
    res.json(result);
  }

  async deleteCategory(req, res) {
    const result = await categoryService.deleteCategory(req.params.id);
    res.json(result);
  }
}

export default new CategoryController();
