const validator = (schema) => (req, res, next) => {
  const { error } = schema.validate(req.body);

  if (error) {
    return res.status(422).json({
      status: "error",
      message: "Doğrulama hatası",
      errors: error.details.map((err) => err.message),
    });
  }
  next();
};

module.exports = validator;
