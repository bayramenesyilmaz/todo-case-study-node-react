const response = {
  successResponse: (res, status = 200, message, data, meta = null) => {
    const filterData = {
      status: "success",
      message,
    };

    if (data) {
      filterData.data = data;
    }
    if (meta) {
      filterData.meta = meta;
    }

    return res.status(status).json(filterData);
  },
  errorResponse: (res, status = 400, message, errors) => {
    return res.status(status).json({
      status: "error",
      message,
      errors: errors ? [errors] : null,
    });
  },
};
module.exports = response;
