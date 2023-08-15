const jwt = require('jsonwebtoken');
const { SECRET_KEY } = require('../utils/config');
const UnauthorizedError = require('../errors/unauthorized-err');
const { UNAUTHORIZED_ERROR } = require('../utils/constants');

const handleAuthError = (res, req, next) => {
  next(new UnauthorizedError(UNAUTHORIZED_ERROR));
};

const extractBearerToken = (header) => header.replace('Bearer ', '');

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    return handleAuthError(res, req, next);
  }

  const token = extractBearerToken(authorization);
  let payload;

  try {
    payload = jwt.verify(token, SECRET_KEY);
  } catch (err) {
    return handleAuthError(res, req, next);
  }

  req.user = payload;

  return next();
};
