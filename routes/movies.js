const movieRouter = require('express').Router();
const {
  getMovies,
  createMovie,
  deleteMovie,
} = require('../controllers/movies');
const {
  validateDataBaseId,
  validateMovieInfo,
} = require('../validation/validation');

movieRouter.get('/', getMovies);
movieRouter.post('/', validateMovieInfo, createMovie);
movieRouter.delete('/:id', validateDataBaseId, deleteMovie);

module.exports = movieRouter;
