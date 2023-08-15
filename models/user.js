const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const validator = require('validator');
const UnauthorizedError = require('../errors/unauthorized-err');
const { INCORRECT_EMAIL, INCORRECT_AUTH_DATA } = require('../utils/constants');

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      minlength: 2,
      maxlength: 30,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      validate: {
        validator: (email) => validator.isEmail(email),
        message: INCORRECT_EMAIL,
      },
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
  },
);

userSchema.statics.findUserByCredentials = function checkUserData(email, password) {
  return this.findOne({ email })
    .select('+password')
    .then((user) => {
      if (!user) {
        return Promise.reject(
          new UnauthorizedError(INCORRECT_AUTH_DATA),
        );
      }

      return bcrypt.compare(password, user.password).then((matched) => {
        if (!matched) {
          return Promise.reject(
            new UnauthorizedError(INCORRECT_AUTH_DATA),
          );
        }

        return user;
      });
    });
};

module.exports = mongoose.model('user', userSchema);
