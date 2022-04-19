const { ApiError } = require('../errors/ApiError');

// eslint-disable-next-line no-unused-vars
const errorHandler = (err, req, res, next) => {
  const { status } = err;
  return err instanceof ApiError ? res.status(status).json({ message: err.message }) : res.status(500).json({ message: `На сервере произошла ошибка: ${err}` });
};

module.exports = { errorHandler };
