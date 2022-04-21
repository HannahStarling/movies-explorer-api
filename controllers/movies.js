const { ApiError } = require('../errors/ApiError');
const Movie = require('../models/movie');

const getMovies = async (req, res, next) => {
  try {
    const { _id: owner } = req.user;
    const movies = Movie.find({ owner });
    return res.status(200).send(movies);
  } catch (error) {
    return next(error);
  }
};

const createMovie = async (req, res, next) => {
  try {
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
    return error.name === 'CastError' || error.name === 'ValidationError'
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
      ? next(ApiError.badRequest())
      : next(error);
  }
};

module.exports = {
  getMovies,
  createMovie,
  deleteMovie,
};
