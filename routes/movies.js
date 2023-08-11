const router = require('express').Router();

const { getMovies, createMovie, deleteMovieById } = require('../controllers/movies');
const { createMovieValidation, deleteMovieByIdValidation } = require('../utils/validation');

router.get('/', getMovies);
router.post('/', createMovieValidation, createMovie);
router.delete('/:_id', deleteMovieByIdValidation, deleteMovieById);

module.exports = router;
