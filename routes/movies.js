const movieRouter = require('express').Router();
const {
  getMovies,
  createMovie,
  deleteMovie,
} = require('../controllers/movies');

movieRouter.get('/', getMovies);
movieRouter.put('/', createMovie);
movieRouter.delete('/_id', deleteMovie);

module.exports = movieRouter;
