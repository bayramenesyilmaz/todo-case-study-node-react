const mongoose = require("mongoose");

const TodoShema = new mongoose.Schema(
  {
    title: { type: String, required: true, minLength: 3, maxLength: 100 },
    description: { type: String, maxLength: 500 },
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
    due_date: { type: Date },
    category_ids: [{ type: mongoose.Schema.Types.ObjectId, ref: "Category" }],
    owner_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    }, // Todo'yu oluşturan kullanıcı
    shared_with: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }], // Paylaşılan kullanıcılar
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now },
    deleted_at: { type: Date, default: null },
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
        if (ret.owner_id) {
          ret.owner = ret.owner_id;
          delete ret.owner_id;
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
