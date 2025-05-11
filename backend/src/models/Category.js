const mongoose = require("mongoose");

const CategorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      minLength: 3,
      maxLength: 50,
    },
    color: {
      type: String,
      default: "#FFFFFF",
      validate: {
        validator: function (v) {
          return /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(v);
        },
        message: "Geçerli bir hex renk kodu giriniz",
      },
    },
    created_at: {
      type: Date,
      default: Date.now,
    },
    updated_at: {
      type: Date,
      default: Date.now,
    },
  },
  {
    toJSON: {
      transform: function (doc, ret) {
        const id = ret._id;
        delete ret._id;
        delete ret.__v;
        return {
          id,
          ...ret,
        };
      },
      virtuals: true,
    },
  }
);

const Category = mongoose.model("Category", CategorySchema);
module.exports = Category;
