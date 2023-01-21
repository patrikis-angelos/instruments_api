import categoryService from '../services/category.js';
import Category from '../entities/Category.js';

class CategoryController {
  async getCategories(req, res) {
    const result = await categoryService.getCategories();
    res.json({ data: result });
  }

  async getCategory(req, res, next) {
    const result = await categoryService.getCategory(req.params.id);
    if (!result) throw new Error('Not found');
    res.json({ data: result });
  }

  async createCategory(req, res) {
    const category = new Category(req.body);
    category.validate();
    const result = await categoryService.createCategory(category);
    res.json({ data: result });
  }

  async updateCategory(req, res) {
    const category = new Category(req.body);
    const result = await categoryService.updateCategory(req.params.id, category);
    res.json({ data: result });
  }

  async deleteCategory(req, res) {
    const result = await categoryService.deleteCategory(req.params.id);
    res.json({ data: result });
  }
}

export default new CategoryController();
