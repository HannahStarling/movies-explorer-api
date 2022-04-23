const jwt = require('jsonwebtoken');
const { ApiError } = require('../errors/ApiError');
const { JWT_CONFIG } = require('../utils/constants');

const { key } = JWT_CONFIG;

const auth = (req, res, next) => {
  const token = req.cookies.jwt;
  let payload;
  try {
    payload = jwt.verify(token, key);
  } catch (err) {
    throw ApiError.unauthorized();
  }
  req.user = payload;
  return next();
};

module.exports = {
  auth,
};
