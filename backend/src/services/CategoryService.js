const CategoryRepository = require("../repositories/CategoryRepository");

class CategoryService {
  async getAllCategories() {
    const categories = await CategoryRepository.FindAll();
    return categories;
  }

  async getCategoryById(id) {
    const category = await CategoryRepository.FindById(id);
    if (!category) {
      throw new Error("Category not found");
    }
    return category;
  }

  async createCategory(categoryData) {
    const category = await CategoryRepository.Create(categoryData);
    if (!category) {
      throw new Error("Failed to create category");
    }
    return category;
  }

  async updateCategory(id, categoryData) {
    const category = await CategoryRepository.Update(id, categoryData);
    if (!category) {
      throw new Error("Failed to update category");
    }
    return category;
  }

  async deleteCategory(id) {
    const category = await CategoryRepository.Delete(id);
    if (!category) {
      throw new Error("Failed to delete category");
    }
    return category;
  }
  async getTodosByCategoryId(id) {
    const todos = await CategoryRepository.FindTodosByCategoryId(id);
    if (!todos) {
      throw new Error("Failed to get todos by category id");
    }
    return todos;
  }
}
