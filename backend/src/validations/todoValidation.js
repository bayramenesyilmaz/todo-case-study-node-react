const Joi = require("joi");
const dayjs = require("dayjs");

const createTodoSchema = Joi.object({
  title: Joi.string().min(3).max(100).required().messages({
    "string.empty": "Başlık alanı boş olamaz",
    "string.min": "Başlık en az 3 karakter olmalıdır",
    "string.max": "Başlık en fazla 100 karakter olmalıdır",
    "any.required": "Başlık alanı zorunludur",
  }),
  description: Joi.string().max(500).allow(""),
  status: Joi.string()
    .valid("pending", "in_progress", "completed", "cancelled")
    .messages({
      "any.only":
        "Geçersiz durum değeri! Geçerli değerler: [pending, in_progress, completed, cancelled]",
      "any.required": "Durum alanı zorunludur",
    }),

  priority: Joi.string().valid("low", "medium", "high").messages({
    "any.only": "Geçersiz öncelik değeri geçerli değerler: [low, medium, high]",
    "any.required": "Öncelik alanı zorunludur",
  }),
  due_date: Joi.date().greater(dayjs().toDate()).messages({
    "date.greater": "Bitiş tarihi bugünden sonraki bir tarih olmalıdır.",
  }),
  category_ids: Joi.array().items(Joi.string()).required().messages({
    "any.required": "Kategori seçimi zorunludur",
    "array.base": "Kategoriler bir dizi olmalıdır",
  }),
  shared_with: Joi.array()
    .items(
      Joi.string()
        .regex(/^[0-9a-fA-F]{24}$/)
        .messages({
          "string.pattern.base": "Geçersiz kullanıcı ID formatı",
        })
    )
    .unique()
    .default([])
    .messages({
      "array.unique": "Aynı kullanıcı birden fazla kez eklenemez",
      "array.base": "Paylaşılan kullanıcılar bir dizi olmalıdır",
    }),
});

const updateTodoSchema = Joi.object({
  title: Joi.string().min(3).max(100).required().messages({
    "string.empty": "Başlık alanı boş olamaz",
    "string.min": "Başlık en az 3 karakter olmalıdır",
    "string.max": "Başlık en fazla 100 karakter olmalıdır",
    "any.required": "Başlık alanı zorunludur",
  }),
  description: Joi.string().max(500).allow(""),
  status: Joi.string()
    .valid("pending", "in_progress", "completed", "cancelled")
    .messages({
      "any.only":
        "Geçersiz durum değeri! Geçerli değerler: [pending, in_progress, completed, cancelled]",
    }),
  priority: Joi.string().valid("low", "medium", "high").messages({
    "any.only": "Geçersiz öncelik değeri geçerli değerler: [low, medium, high]",
  }),
  due_date: Joi.date().greater(dayjs().toDate()).messages({
    "date.greater": "Bitiş tarihi bugünden sonraki bir tarih olmalıdır.",
  }),
  category_ids: Joi.array().items(Joi.string()),
  shared_with: Joi.array()
    .items(
      Joi.string()
        .regex(/^[0-9a-fA-F]{24}$/)
        .messages({
          "string.pattern.base": "Geçersiz kullanıcı ID formatı",
        })
    )
    .unique()
    .messages({
      "array.unique": "Aynı kullanıcı birden fazla kez eklenemez",
      "array.base": "Paylaşılan kullanıcılar bir dizi olmalıdır",
    }),
});

const updateStatusSchema = Joi.object({
  status: Joi.string()
    .valid("pending", "in_progress", "completed", "cancelled")
    .required()
    .messages({
      "any.only":
        "Geçersiz durum değeri! Geçerli değerler: [pending, in_progress, completed, cancelled]",
    }),
});

module.exports = {
  createTodoSchema,
  updateTodoSchema,
  updateStatusSchema,
};
