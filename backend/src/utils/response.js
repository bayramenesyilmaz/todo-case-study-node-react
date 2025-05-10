const response = {
  successResponse: (res, status = 200, message, data, meta = null) => {
    return res.status(status).json({
      status: "success",
      message,
      data,
      meta,
    });
  },
  errorResponse: (res, status = 400, message, errors) => {
    return res.status(status).json({
      status: "error",
      message,
      data: null,
      meta: null,
      errors: errors ? [errors] : null,
    });
  },
};
module.exports = response;
