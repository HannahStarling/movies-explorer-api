const movieRouter = require('express').Router();

movieRouter.get('/', getMovies);
movieRouter.put('/', createMovie);
movieRouter.delete('/_id', deleteMovie);

module.exports = movieRouter;
