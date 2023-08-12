const { CODE_ERROR_401 } = require('../utils/constants');

class UnauthorizedError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = CODE_ERROR_401;
  }
}

module.exports = UnauthorizedError;
