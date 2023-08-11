const router = require('express').Router();

const usersRouter = require('./users');
const moviesRouter = require('./movies');

const auth = require('../middlewares/auth');
const { createUser, login } = require('../controllers/users');

const NotFoundError = require('../errors/not-found-err');
const { createUserValidation, loginUserValidation } = require('../utils/validation');
const { INCORRECT_REQUEST } = require('../utils/constants');

router.post('/signup', createUserValidation, createUser);
router.post('/signin', loginUserValidation, login);

router.use('/users', auth, usersRouter);

router.use('/movies', auth, moviesRouter);

router.all('*', (req, res, next) => next(new NotFoundError(INCORRECT_REQUEST)));

module.exports = router;
