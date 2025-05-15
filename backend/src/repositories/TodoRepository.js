const Todo = require("../models/Todo");
const mongoose = require("mongoose");
const { createPagination } = require("../utils/pagination");

class TodoRepository {
  // Sabit değerler ve yardımcı metodlar
  //BURAYI İNCELE
  #priorityValues = {
    high: 3,
    medium: 2,
    low: 1,
  };

  #createBasicQuery({ status, priority }) {
    const query = { deleted_at: null };
    if (status) query.status = status;
    if (priority) query.priority = priority;
    return query;
  }

  #createSortStage(sort, order) {
    if (sort === "priority") {
      return [
        {
          $addFields: {
            priorityOrder: {
              $switch: {
                branches: [
                  { case: { $eq: ["$priority", "high"] }, then: 3 },
                  { case: { $eq: ["$priority", "medium"] }, then: 2 },
                  { case: { $eq: ["$priority", "low"] }, then: 1 },
                ],
                default: 0,
              },
            },
          },
        },
        { $sort: { priorityOrder: order === "asc" ? 1 : -1 } },
      ];
    }

    const sortQuery = {};
    sortQuery[sort] = order === "asc" ? 1 : -1;
    return [{ $sort: sortQuery }];
  }

  async FindAll({
    page = 1,
    limit = 10,
    sort = "created_at",
    order = "desc",
    status,
    priority,
  }) {
    const currentPage = parseInt(page);
    const currentLimit = parseInt(limit);
    const skip = (currentPage - 1) * currentLimit;

    const query = this.#createBasicQuery({ status, priority });

    const pipeline = [
      { $match: query },
      ...this.#createSortStage(sort, order),
      { $skip: skip },
      { $limit: currentLimit },
      {
        $lookup: {
          from: "categories",
          localField: "category_ids",
          foreignField: "_id",
          as: "categories",
        },
      },
      {
        $project: {
          title: 1,
          description: 1,
          status: 1,
          priority: 1,
          due_date: 1,
          created_at: 1,
          updated_at: 1,
          category_ids: {
            $map: {
              input: "$categories",
              as: "category",
              in: {
                id: "$$category._id",
                name: "$$category.name",
                color: "$$category.color",
              },
            },
          },
        },
      },
    ];

    const [results, countResult] = await Promise.all([
      Todo.aggregate(pipeline),
      Todo.countDocuments(query),
    ]);

    const transitionedResults = results.map((todo) => {
      const { _id, __v, category_ids, ...rest } = todo;

      return {
        id: _id,
        ...rest,
        categories: (category_ids || []).map((cat) => ({
          id: cat.id || cat._id,
          name: cat.name,
          color: cat.color,
        })),
      };
    });

    return {
      todos: transitionedResults,
      pagination: createPagination({
        total: countResult,
        page: currentPage,
        limit: currentLimit,
        count: transitionedResults.length,
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

  async Search(params) {
    const currentPage = parseInt(1);
    const currentLimit = parseInt(10);

    const { q } = params;

    const query = {
      deleted_at: null,
    };

    const skip = (currentPage - 1) * currentLimit;
    const sortQuery = { created_at: 1 };

    console.log("sea : ", q);

    const searchRegex = new RegExp(q, "i");

    const todos = await Todo.find({
      ...query,
      $or: [{ title: searchRegex }, { description: searchRegex }],
    })
      .populate({
        path: "category_ids",
        select: "id name color ",
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
                    { $in: ["$status", ["pending", "in_progress"]] },
                    { $ne: ["$status", "cancelled"] },
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
