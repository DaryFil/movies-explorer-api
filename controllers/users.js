const mongoose = require('mongoose');
const jwt = require('jsonwebtoken'); // импортируем модуль jsonwebtoken
const bcrypt = require('bcryptjs'); // импортируем bcrypt
const User = require('../models/user');
const { SECRET_KEY } = require('../utils/config');
const NotFoundError = require('../errors/not-found-err');
const BadRequest = require('../errors/bad-request');
const ConflictError = require('../errors/conflict-err');
const {
  SUCCESS_CODE_201,
  INCORRECT_USER_DATA_ADD,
  NOT_UNIQUE_EMAIL,
  USER_NOT_FOUND,
  INCORRECT_USER_DATA,
  INCORRECT_USER_DATA_UPDATE,
} = require('../utils/constants');

// Создать нового пользователя
module.exports.createUser = (req, res, next) => {
  const {
    name, email, password,
  } = req.body;

  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      name,
      email,
      password: hash,
    }))
    .then(() => res.status(SUCCESS_CODE_201).send({
      data: {
        name, email,
      },
    }))
    .catch((err) => {
      if (err instanceof mongoose.Error.ValidationError) {
        next(new BadRequest(INCORRECT_USER_DATA_ADD));
      } else if (err.code === 11000) {
        next(new ConflictError(NOT_UNIQUE_EMAIL));
      } else { next(err); }
    });
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      res.send({
        token: jwt.sign({ _id: user._id }, SECRET_KEY, { expiresIn: '7d' }),
      });
    })
    .catch((err) => {
      next(err);
    });
};

module.exports.searchUserById = (req, res, next) => {
  const { _id } = req.user;

  User.findById(_id)
    .then((user) => {
      if (user) {
        res.send({ data: user });
      } else {
        throw new NotFoundError(USER_NOT_FOUND);
      }
    })
    .catch((err) => {
      if (err instanceof mongoose.CastError) {
        next(new BadRequest(INCORRECT_USER_DATA));
      } else {
        next(err);
      }
    });
};

function updateUserInfo(req, res, next, data) {
  User.findByIdAndUpdate(req.user._id, data, { runValidators: true, context: 'query', new: true })
    .then((user) => {
      if (user) {
        res.send({ data: user });
      } else { throw new NotFoundError(USER_NOT_FOUND); }
    })
    .catch((err) => {
      if (err.code === 11000) {
        return next(new ConflictError(NOT_UNIQUE_EMAIL));
      }
      if (err instanceof mongoose.Error.ValidationError) {
        next(new BadRequest(INCORRECT_USER_DATA_UPDATE));
      }
      return next(err);
    });
}

module.exports.updateUser = (req, res, next) => {
  const { name, email } = req.body;

  updateUserInfo(req, res, next, { name, email });
};
