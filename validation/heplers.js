const { Joi, CelebrateError } = require('celebrate');
const { isValidObjectId } = require('mongoose');
const { isURL } = require('validator');

const { ERROR_MESSAGES } = require('../utils/constants');

const { ID, URL } = ERROR_MESSAGES;

const isValidId = Joi.custom((value) => {
  if (isValidObjectId(value)) return value;
  throw new CelebrateError(ID);
});

const validateURL = (value) => {
  if (!isURL(value, { require_protocol: true })) {
    throw new CelebrateError(URL);
  }
  return value;
};

module.exports = {
  isValidId,
  validateURL,
};
