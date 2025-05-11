const Category = require("../models/Category");
const Todo = require("../models/Todo");
const mongoose = require("mongoose");

class CategoryRepository {
  async FindAll() {
    const query = {
      deleted_at: null,
    };
    const categories = await Category.find(query);
    const total = await Category.countDocuments(query);

    return {
      categories,
      total,
    };
  }

  async FindById(id) {
    if (!mongoose.isValidObjectId(id)) {
      return null;
    }
    const category = await Category.findOne({
      _id: id,
    });

    return category;
  }

  async Create(data) {
    const category = new Category(data);
    await category.save();
    return category;
  }

  async Update(id, data) {
    if (!mongoose.isValidObjectId(id)) {
      return null;
    }
    const category = await Category.findByIdAndUpdate(id, data, { new: true });
    return category;
  }

  async Delete(id) {
    if (!mongoose.isValidObjectId(id)) {
      return null;
    }
    const category = await Category.findByIdAndDelete(id);
    return category;
  }

  async FindTodosByCategoryId(id) {
    if (!mongoose.isValidObjectId(id)) {
      return null;
    }
    const todos = await Todo.find({ categories: id }).populate({
      path: "categories",
      select: "id name color  ",
      data: { deleted_at: null },
    });

    return todos;
  }
}
module.exports = new CategoryRepository();
