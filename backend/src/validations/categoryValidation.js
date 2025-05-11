// backend/src/validations/categoryValidation.js
const Joi = require("joi");

const createCategorySchema = Joi.object({
  name: Joi.string().min(3).max(50).required().messages({
    "string.base": "Kategori adı metin olmalıdır",
    "string.empty": "Kategori adı boş olamaz",
    "string.min": "Kategori adı en az 3 karakter olmalıdır",
    "string.max": "Kategori adı en fazla 50 karakter olmalıdır",
    "any.required": "Kategori adı zorunludur",
  }),

  color: Joi.string()
    .pattern(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/)
    .default("#FFFFFF")
    .messages({
      "string.pattern.base": "Geçerli bir hex renk kodu giriniz (örn. #FF5733)",
    }),
});

const updateCategorySchema = Joi.object({
  name: Joi.string().min(3).max(50).messages({
    "string.base": "Kategori adı metin olmalıdır",
    "string.empty": "Kategori adı boş olamaz",
    "string.min": "Kategori adı en az 3 karakter olmalıdır",
    "string.max": "Kategori adı en fazla 50 karakter olmalıdır",
  }),

  color: Joi.string()
    .pattern(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/)
    .messages({
      "string.pattern.base": "Geçerli bir hex renk kodu giriniz (örn. #FF5733)",
    }),
});

module.exports = {
  createCategorySchema,
  updateCategorySchema,
};
