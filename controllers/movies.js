const { ApiError } = require('../errors/ApiError');
const Movie = require('../models/movie');
const { ERROR_MESSAGES } = require('../utils/constants');

const { MOVIE_CONFLICT, ID } = ERROR_MESSAGES;

const getMovies = async (req, res, next) => {
  try {
    const { _id: owner } = req.user;
    const movies = await Movie.find({ owner });
    return res.status(200).send(movies);
  } catch (error) {
    return error.name === 'CastError' || error.name === 'ValidationError'
      ? next(ApiError.badRequest())
      : next(error);
  }
};

const createMovie = async (req, res, next) => {
  try {
    const owner = req.user._id;
    const {
      country,
      director,
      duration,
      year,
      description,
      image,
      trailer,
      nameRU,
      nameEN,
      thumbnail,
      movieId,
    } = req.body;
    const movie = await Movie.create({
      owner,
      country,
      director,
      duration,
      year,
      description,
      image,
      trailerLink: trailer,
      nameRU,
      nameEN,
      thumbnail,
      movieId,
    });
    return movie
      ? res.status(200).send({
        country: movie.country,
        director: movie.director,
        duration: movie.duration,
        year: movie.year,
        description: movie.description,
        image: movie.image,
        trailerLink: movie.trailer,
        nameRU: movie.nameRU,
        thumbnail: movie.thumbnail,
        owner: movie.owner,
        nameEN: movie.nameEN,
        movieId: movie.movieId,
      })
      : next(ApiError.iternal());
  } catch (error) {
    const { name, code } = error;
    if (code === 11000) { return ApiError.conflict(MOVIE_CONFLICT); }
    return name === 'CastError' || name === 'ValidationError'
      ? next(ApiError.badRequest())
      : next(error);
  }
};

const deleteMovie = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { _id } = req.user;
    const { owner } = Movie.findById(id);
    if (_id.toString() === owner.toString()) {
      const deleteCard = await Movie.findByIdAndRemove(id);
      return res.status(200).send(deleteCard);
    }
    return next(ApiError.forbidden());
  } catch (error) {
    return error.name === 'CastError'
      ? next(ApiError.badRequest(ID))
      : next(error);
  }
};

module.exports = {
  getMovies,
  createMovie,
  deleteMovie,
};
