const logger = require("../utils/logger");

const errorHandler = (err, req, res, next) => {
  logger.error(err.message, { stack: err.stack });

  res.status(err.status || 500).json({
    status: "error",
    message: err.message || "Bir hata oluştu",
  });
};

module.exports = errorHandler;
