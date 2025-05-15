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
    priority,
  }) {
    const currentPage = parseInt(page);
    const currentLimit = parseInt(limit);

    const query = {
      deleted_at: null,
    };

    if (status) {
      query.status = status;
    }

    if (priority) {
      query.priority = priority;
    }

    const skip = (currentPage - 1) * currentLimit;
    const sortQuery = {};
    sortQuery[sort] = order === "asc" ? 1 : -1;

    const todos = await Todo.find(query)
      .populate({
        path: "category_ids",
        select: "id name color",
      })
      .sort(sortQuery)
      .skip(skip)
      .limit(currentLimit);

    const total = await Todo.countDocuments(query);

    return {
      todos,
      pagination: createPagination({
        total,
        page: currentPage,
        limit: currentLimit,
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
    }).populate({
      path: "category_ids",
      select: "id name color",
    });

    return todo;
  }

  async Create(data) {
    const todo = new Todo(data);
    await todo.save();
    return await Todo.findById(todo._id).populate({
      path: "category_ids",
      select: "id name color",
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
    ).populate({
      path: "category_ids",
      select: "id name color",
    });

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

  async Search({
    q,
    page = 1,
    limit = 10,
    sort = "created_at",
    order = "asc",
    status,
    priority,
  }) {
    const currentPage = parseInt(page);
    const currentLimit = parseInt(limit);

    const query = {
      deleted_at: null,
    };

    if (status) {
      query.status = status;
    }
    if (priority) {
      query.priority = priority;
    }

    const skip = (currentPage - 1) * currentLimit;
    const sortQuery = {};
    sortQuery[sort] = order === "asc" ? 1 : -1;

    const searchRegex = new RegExp(q, "i");
    const todos = await Todo.find({
      ...query,
      $or: [{ title: searchRegex }, { description: searchRegex }],
    })
      .populate({
        path: "category_ids",
        select: "id name color  ",
      })
      .sort(sortQuery)
      .skip(skip)
      .limit(currentLimit);

    const total = await Todo.countDocuments({
      ...query,
      $or: [{ title: searchRegex }, { description: searchRegex }],
    });

    return {
      todos,
      pagination: createPagination({
        total,
        page: currentPage,
        limit: currentLimit,
        count: todos.length,
      }),
    };
  }

  async GetStats() {
    const currentDate = new Date();

    const stats = await Todo.aggregate([
      {
        $match: {
          deleted_at: null,
        },
      },
      {
        $group: {
          _id: null,
          pending: {
            $sum: {
              $cond: [{ $eq: ["$status", "pending"] }, 1, 0],
            },
          },
          in_progress: {
            $sum: {
              $cond: [{ $eq: ["$status", "in_progress"] }, 1, 0],
            },
          },
          completed: {
            $sum: {
              $cond: [{ $eq: ["$status", "completed"] }, 1, 0],
            },
          },
          cancelled: {
            $sum: {
              $cond: [{ $eq: ["$status", "cancelled"] }, 1, 0],
            },
          },
          total: {
            $sum: 1,
          },
          overdue: {
            $sum: {
              $cond: [
                {
                  $and: [
                    { $lt: ["$due_date", currentDate] },
                    { $eq: ["$status", "pending"] },
                    { $ne: ["status", "cancelled"] },
                  ],
                },
                1,
                0,
              ],
            },
          },
        },
      },
      {
        $project: {
          _id: 0,
          pending: 1,
          in_progress: 1,
          completed: 1,
          cancelled: 1,
          total: 1,
          overdue: 1,
        },
      },
    ]);

    return (
      stats[0] || {
        pending: 0,
        in_progress: 0,
        completed: 0,
        cancelled: 0,
        total: 0,
        overdue: 0,
      }
    );
  }
}

module.exports = new TodoRepository();
