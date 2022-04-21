const { celebrate, Joi, CelebrateError } = require('celebrate');
const { isValidObjectId } = require('mongoose');
const { isURL } = require('validator');

const isValidId = Joi.custom((value) => {
  if (isValidObjectId(value)) return value;
  throw new CelebrateError('Неверный id');
});

const validateURL = (value) => {
  if (!isURL(value, { require_protocol: true })) {
    throw new CelebrateError('Неправильный формат ссылки');
  }
  return value;
};

const validateDataBaseId = celebrate({
  params: Joi.object().keys({
    id: isValidId,
  }),
});

const validateUser = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }),
});

const validateUserInfo = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    email: Joi.string().email().required(),
  }),
});

const validateMovieInfo = celebrate({
  body: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    year: Joi.string().length(4).required(),
    description: Joi.string().required(),
    image: Joi.string().custom(validateURL).required(),
    trailer: Joi.string().custom(validateURL).required(),
    thumbnail: Joi.string().custom(validateURL).required(),
    movieId: Joi.number().required(),
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
  }),
});

module.exports = {
  validateUser,
  validateUserInfo,
  validateDataBaseId,
  validateMovieInfo,
};
