const Todo = require("../models/Todo");
const mongoose = require("mongoose");
const { createPagination } = require("../utils/pagination");

class TodoRepository {
  async FindAll({
    page = 1,
    limit = 10,
    sort = "created_at",
    order = "asc",
    status,
    piority,
  }) {
    const query = {
      deleted_at: null,
    };

    if (status) {
      query.status = status;
    }

    if (piority) {
      query.piority = piority;
    }

    const skip = (page - 1) * limit;
    const sortQuery = {};
    sortQuery[sort] = order === "asc" ? 1 : -1;

    const todos = await Todo.find(query)
      .sort(sortQuery)
      .skip(skip)
      .limit(limit);
    const total = await Todo.countDocuments(query);

    return {
      todos,
      pagination: createPagination({
        total,
        page,
        limit,
        count: todos.length,
      }),
    };
  }

  async FindById(id) {
    if (!mongoose.isValidObjectId(id)) {
      return null;
    }
    const todo = await Todo.findOne({
      _id: id,
      deleted_at: null,
    });
    return todo;
  }

  async Create(data) {
    const todo = new Todo(data);
    await todo.save();
    return await Todo.findById(todo._id).populate({
      path: "categories",
      select: "id name color -_id",
    });
  }

  async Update(id, todoData) {
    if (!mongoose.isValidObjectId(id)) {
      return null;
    }
    const todo = await Todo.findOneAndUpdate(
      { _id: id, deleted_at: null },
      { ...todoData, updated_at: Date.now() },
      { new: true }
    );
    return todo;
  }

  async UpdateStatus(id, status) {
    if (!mongoose.isValidObjectId(id)) {
      return null;
    }
    const todo = await Todo.findOneAndUpdate(
      { _id: id, deleted_at: null },
      { status, updated_at: Date.now() },
      { new: true }
    );
    return todo;
  }

  async Delete(id) {
    if (!mongoose.isValidObjectId(id)) {
      return null;
    }
    const todo = await Todo.findOneAndUpdate(
      { _id: id, deleted_at: null },
      { deleted_at: Date.now() },
      { new: true }
    );
    return todo;
  }

  async Search(query) {
    const searchRegex = new RegExp(query, "i");
    const todos = await Todo.find({
      deleted_at: null,
      $or: [{ title: searchRegex }, { description: searchRegex }],
    });
    return todos;
  }
}

module.exports = new TodoRepository();
