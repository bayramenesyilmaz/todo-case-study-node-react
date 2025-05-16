const Joi = require("joi");

const loginSchema = Joi.object({
  email: Joi.string().email().required().messages({
    "string.email": "Geçerli bir email adresi giriniz",
    "any.required": "Email adresi zorunludur",
    "string.empty": "Email adresi boş olamaz",
  }),
  password: Joi.string().min(6).required().messages({
    "string.min": "Şifre en az 6 karakter olmalıdır",
    "any.required": "Şifre zorunludur",
    "string.empty": "Şifre boş olamaz",
  }),
});

const registerSchema = Joi.object({
  name: Joi.string().min(3).max(50).required().messages({
    "string.min": "İsim en az 3 karakter olmalıdır",
    "string.max": "İsim en fazla 50 karakter olmalıdır",
    "any.required": "İsim zorunludur",
    "string.empty": "İsim boş olamaz",
  }),
  email: Joi.string().email().required().messages({
    "string.email": "Geçerli bir email adresi giriniz",
    "any.required": "Email adresi zorunludur",
    "string.empty": "Email adresi boş olamaz",
  }),
  password: Joi.string().min(6).required().messages({
    "string.min": "Şifre en az 6 karakter olmalıdır",
    "any.required": "Şifre zorunludur",
    "string.empty": "Şifre boş olamaz",
  }),
  passwordConfirm: Joi.string().valid(Joi.ref("password")).required().messages({
    "any.only": "Şifreler eşleşmiyor",
    "any.required": "Şifre tekrarı zorunludur",
  }),
});

module.exports = {
  loginSchema,
  registerSchema,
};
