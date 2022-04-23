const { ApiError } = require('../errors/ApiError');
const { ERROR_MESSAGES } = require('../utils/constants');

const { INTERNAL } = ERROR_MESSAGES;

const errorHandler = (err, req, res, next) => {
  const { status = 500, message = INTERNAL } = err;
  if (next) {
    next();
  }
  return err instanceof ApiError
    ? res.status(status).send({ message })
    : res.status(500).json({ message });
};

module.exports = { errorHandler };
