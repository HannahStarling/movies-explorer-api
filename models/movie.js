const { Schema, model } = require('mongoose');
const { isURL } = require('validator');

const movieSchema = new Schema({
  country: {
    type: String,
    required: true,
  },
  director: {
    type: String,
    required: true,
  },
  duration: {
    type: Number,
    required: true,
  },
  year: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
    validate: isURL,
    message: 'Неправильный формат ссылки',
  },
  trailerLink: {
    type: String,
    required: true,
    validate: isURL,
    message: 'Неправильный формат ссылки',
  },
  thumbnail: {
    type: String,
    required: true,
    validate: isURL,
    message: 'Неправильный формат ссылки',
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  // movieId — id фильма, который содержится в ответе сервиса MoviesExplorer. Обязательное поле.
  // movieId: {
  //   type: String,
  //   required: true,
  // },
  nameRU: {
    type: String,
    required: true,
  },
  nameEN: {
    type: String,
    required: true,
  },
});

module.exports = model('movie', movieSchema);
