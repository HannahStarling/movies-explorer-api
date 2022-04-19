const { ApiError } = require('../errors/ApiError');

const handleNotFound = (req, res, next) => next(ApiError.notFound());

module.exports = { handleNotFound };
