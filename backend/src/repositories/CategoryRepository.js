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

  async FindTodosByCategoryId(id, userId) {
    if (!mongoose.isValidObjectId(id) || !mongoose.isValidObjectId(userId)) {
      return null;
    }

    const todos = await Todo.find({
      category_ids: id,
      deleted_at: null,
      $or: [
        { owner_id: new mongoose.Types.ObjectId(userId) },
        { shared_with: new mongoose.Types.ObjectId(userId) },
      ],
    }).populate([
      {
        path: "category_ids",
        select: "id name color",
      },
      {
        path: "owner_id",
        select: "id name email",
      },
      {
        path: "shared_with",
        select: "id name email",
      },
    ]);

    return todos;
  }
}
module.exports = new CategoryRepository();
