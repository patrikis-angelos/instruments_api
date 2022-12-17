class CategoryController {
  getCategories(req, res) {
    res.send('All Categpries');
  }

  getCategory(req, res) {
    res.send('Category');
  }

  createCategory(req, res) {
    res.send('Create Category');
  }

  updateCategory(req, res) {
    res.send('Update Category');
  }

  deleteCategory(req, res) {
    res.send('Delete Category');
  }
}

export default new CategoryController();
