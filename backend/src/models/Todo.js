const mongoose = require("mongoose");

const TodoShema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      minLength: 3,
      maxLength: 100,
    },
    description: {
      type: String,
      maxLength: 500,
    },
    status: {
      type: String,
      enum: ["pending", "in_progress", "completed", "cancelled"],
      default: "pending",
    },
    priority: {
      type: String,
      enum: ["low", "medium", "high"],
      default: "medium",
    },
    due_date: {
      type: Date,
    },
    category_ids: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
      },
    ],
    created_at: {
      type: Date,
      default: Date.now,
    },
    updated_at: {
      type: Date,
      default: Date.now,
    },
    deleted_at: {
      type: Date,
      default: null,
    },
  },
  {
    toJSON: {
      transform: (doc, ret) => {
        const id = ret._id;
        delete ret._id;
        delete ret.__v;
        if (ret.category_ids) {
          ret.categories = ret.category_ids;
          delete ret.category_ids;
        }
        return {
          id,
          ...ret,
        };
      },
      virtuals: true,
    },
  }
);

const Todo = mongoose.model("Todo", TodoShema);
module.exports = Todo;
