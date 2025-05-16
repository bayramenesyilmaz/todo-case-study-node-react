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

  #createBasicQuery({ status, priority, userId }) {
    const query = { deleted_at: null };
    if (status) query.status = status;
    if (priority) query.priority = priority;

    if (userId) {
      query.$or = [
        { owner_id: new mongoose.Types.ObjectId(userId) },
        { shared_with: new mongoose.Types.ObjectId(userId) },
      ];
    }
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
    userId,
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

    const query = this.#createBasicQuery({ status, priority, userId });

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
        $lookup: {
          from: "users",
          localField: "owner_id",
          foreignField: "_id",
          as: "owner",
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "shared_with",
          foreignField: "_id",
          as: "shared_with",
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
          owner: {
            $arrayElemAt: ["$owner", 0],
          },
          shared_with: {
            $map: {
              input: "$shared_with",
              as: "user",
              in: {
                id: "$$user._id",
                email: "$$user.email",
                name: "$$user.name",
              },
            },
          },
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
    }).populate([
      {
        path: "category_ids",
        select: "id name color",
      },
      {
        path: "shared_with",
        select: "id name email",
      },
      {
        path: "owner_id",
        select: "id name email",
      },
    ]);

    return todo;
  }

  async Create(data) {
    const todo = new Todo(data);
    await todo.save();
    return await Todo.findById(todo._id).populate([
      {
        path: "category_ids",
        select: "id name color",
      },
      {
        path: "shared_with",
        select: "id name email",
      },
    ]);
  }

  async Update(id, todoData) {
    if (!mongoose.isValidObjectId(id)) {
      return null;
    }
    const todo = await Todo.findOneAndUpdate(
      { _id: id, deleted_at: null },
      { ...todoData, updated_at: Date.now() },
      { new: true }
    )
      .populate({
        path: "category_ids",
        select: "id name color",
      })
      .populate({
        path: "shared_with",
        select: "id name email",
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

  async Search(userId, params) {
    try {
      const currentPage = parseInt(params?.page || 1);
      const currentLimit = parseInt(params?.limit || 20);
      const searchQuery = params?.q || "";

      // Gelen userId string ise ObjectId'ye çevir
      const userObjectId =
        typeof userId === "string"
          ? new mongoose.Types.ObjectId(userId)
          : userId;

      const query = {
        deleted_at: null,
        $and: [
          {
            $or: [{ owner_id: userObjectId }, { shared_with: userObjectId }],
          },
        ],
      };

      // Arama sorgusu varsa ekle
      if (searchQuery.trim()) {
        const searchRegex = new RegExp(searchQuery, "i");
        query.$and.push({
          $or: [{ title: searchRegex }, { description: searchRegex }],
        });
      }

      const skip = (currentPage - 1) * currentLimit;

      const pipeline = [
        { $match: query },
        { $sort: { created_at: -1 } },
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
          $lookup: {
            from: "users",
            localField: "owner_id",
            foreignField: "_id",
            as: "owner",
          },
        },
        {
          $lookup: {
            from: "users",
            localField: "shared_with",
            foreignField: "_id",
            as: "shared_with",
          },
        },
        {
          $project: {
            _id: 1,
            title: 1,
            description: 1,
            status: 1,
            priority: 1,
            due_date: 1,
            created_at: 1,
            updated_at: 1,
            owner: {
              $arrayElemAt: ["$owner", 0],
            },
            shared_with: {
              $map: {
                input: "$shared_with",
                as: "user",
                in: {
                  id: "$$user._id",
                  email: "$$user.email",
                  name: "$$user.name",
                },
              },
            },
            categories: {
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

      const [results, total] = await Promise.all([
        Todo.aggregate(pipeline),
        Todo.countDocuments(query),
      ]);

      return {
        todos: results.map((todo) => ({
          ...todo,
          id: todo._id,
        })),
        pagination: createPagination({
          total,
          page: currentPage,
          limit: currentLimit,
          count: results.length,
        }),
      };
    } catch (error) {
      console.error("Search error:", error);
      throw error;
    }
  }

  async GetStats(userId) {
    try {
      const currentDate = new Date();
      const userObjectId = new mongoose.Types.ObjectId(userId);

      const pipeline = [
        {
          $match: {
            deleted_at: null,
            $or: [{ owner_id: userObjectId }, { shared_with: userObjectId }],
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
            total: { $sum: 1 },
            overdue: {
              $sum: {
                $cond: [
                  {
                    $and: [
                      { $lt: ["$due_date", currentDate] },
                      { $in: ["$status", ["pending", "in_progress"]] },
                    ],
                  },
                  1,
                  0,
                ],
              },
            },
          },
        },
      ];

      const result = await Todo.aggregate(pipeline);

      return (
        result[0] || {
          pending: 0,
          in_progress: 0,
          completed: 0,
          cancelled: 0,
          total: 0,
          overdue: 0,
        }
      );
    } catch (error) {
      console.error("GetStats error:", error);
      throw error;
    }
  }

  async GetPriorityStats(userId) {
    try {
      const userObjectId = new mongoose.Types.ObjectId(userId);

      const pipeline = [
        {
          $match: {
            deleted_at: null,
            $or: [{ owner_id: userObjectId }, { shared_with: userObjectId }],
          },
        },
        {
          $group: {
            _id: null,
            low: {
              $sum: {
                $cond: [{ $eq: ["$priority", "low"] }, 1, 0],
              },
            },
            medium: {
              $sum: {
                $cond: [{ $eq: ["$priority", "medium"] }, 1, 0],
              },
            },
            high: {
              $sum: {
                $cond: [{ $eq: ["$priority", "high"] }, 1, 0],
              },
            },
            total: { $sum: 1 },
          },
        },
      ];

      const result = await Todo.aggregate(pipeline);

      return (
        result[0] || {
          low: 0,
          medium: 0,
          high: 0,
          total: 0,
        }
      );
    } catch (error) {
      console.error("GetPriorityStats error:", error);
      throw error;
    }
  }
}

module.exports = new TodoRepository();
