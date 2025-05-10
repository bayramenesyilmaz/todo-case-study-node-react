const Joi = require("joi");
const dayjs = require("dayjs");

const createTodoSchema = Joi.object({
  title: Joi.string().min(3).max(100).required(),
  description: Joi.string().max(500).allow(""),
  status: Joi.string().valid(
    "pending",
    "in_progress",
    "completed",
    "cancelled"
  ),
  priority: Joi.string().valid("low", "medium", "high"),
  due_date: Joi.date().greater(dayjs().toDate()).messages({
    "date.greater": "Bitiş tarihi bugünden sonraki bir tarih olmalıdır.",
  }),
  category_ids: Joi.array().items(Joi.string()).required().messages({
    "any.required": "Kategori seçimi zorunludur",
    "array.base": "Kategoriler bir dizi olmalıdır"
  })
});

const updateTodoSchema = Joi.object({
  title: Joi.string().min(3).max(100),
  description: Joi.string().max(500).allow(""),
  status: Joi.string().valid(
    "pending",
    "in_progress",
    "completed",
    "cancelled"
  ),
  priority: Joi.string().valid("low", "medium", "high"),
  due_date: Joi.date().greater(dayjs().toDate()).messages({
    "date.greater": "Bitiş tarihi bugünden sonraki bir tarih olmalıdır.",
  }),
  category_ids: Joi.array().items(Joi.string())
});

const updateStatusSchema = Joi.object({
  status: Joi.string()
    .valid("pending", "in_progress", "completed", "cancelled")
    .required(),
});

module.exports = {
  createTodoSchema,
  updateTodoSchema,
  updateStatusSchema,
};
