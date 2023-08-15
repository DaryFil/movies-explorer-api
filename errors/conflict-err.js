const { CODE_ERROR_409 } = require('../utils/constants');

class ConflictError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = CODE_ERROR_409;
  }
}

module.exports = ConflictError;
