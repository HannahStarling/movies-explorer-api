const jwt = require('jsonwebtoken');
const { jwtKey } = require('../utils/constants');

const auth = (req, res, next) => {
  const token = req.cookies.jwt;
  let payload;
  try {
    payload = jwt.verify(token, jwtKey);
  } catch (err) {
    throw new Error('Необходима авторизация');
  }
  req.user = payload;
  return next();
};

module.exports = {
  auth,
};
