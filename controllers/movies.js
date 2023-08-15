const mongoose = require('mongoose');
const Movie = require('../models/movie');
const NotFoundError = require('../errors/not-found-err');
const BadRequest = require('../errors/bad-request');
const ForbiddenError = require('../errors/forbidden-err');
const {
  SUCCESS_CODE_201,
  INCORRECT_DATA_FILM,
  MOVIE_NOT_FOUND,
  ERROR_NO_RIGHTS_TO_DELETE,
} = require('../utils/constants');

module.exports.getMovies = (req, res, next) => {
  const owner = req.user;
  Movie.find({ owner })
    .then((movies) => res.send(movies))
    .catch((err) => next(err));
};

module.exports.createMovie = (req, res, next) => {
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    nameRU,
    nameEN,
    thumbnail,
    movieId,
  } = req.body;

  const owner = req.user;

  Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    nameRU,
    nameEN,
    thumbnail,
    movieId,
    owner,
  })
    .then((movie) => res.status(SUCCESS_CODE_201).send(movie))
    .catch((err) => {
      if (err instanceof mongoose.Error.ValidationError) {
        console.log(err);
        next(new BadRequest(INCORRECT_DATA_FILM));
      } else {
        next(err);
      }
    });
};

module.exports.deleteMovieById = (req, res, next) => {
  const { _id: movieId } = req.params;
  const userId = req.user._id;

  Movie.findById(movieId)
    .then((movieInfo) => {
      if (movieInfo) {
        if (movieInfo.owner._id.toString() === userId) {
          Movie.findByIdAndRemove({ _id: movieId })
            .then((movie) => {
              if (movie) {
                res.send(movie);
              }
            })
            .catch((err) => next(err));
        } else { next(new ForbiddenError(ERROR_NO_RIGHTS_TO_DELETE)); }
      } else {
        throw new NotFoundError(MOVIE_NOT_FOUND);
      }
    })
    .catch((err) => {
      if (err instanceof mongoose.CastError) {
        next(new BadRequest(INCORRECT_DATA_FILM));
      } else {
        next(err);
      }
    });
};
