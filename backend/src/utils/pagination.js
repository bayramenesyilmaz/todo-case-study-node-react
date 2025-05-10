const createPagination = ({
  total,
  page = 1,
  limit = 10,
  count = 0
}) => {
  const lastPage = Math.ceil(total / limit);
  const skip = (page - 1) * limit;

  return {
    total,
    per_page: limit,
    current_page: page,
    last_page: lastPage,
    from: skip + 1,
    to: skip + count,
  };
};

module.exports = { createPagination };