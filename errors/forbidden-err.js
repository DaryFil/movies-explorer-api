const { CODE_ERROR_403 } = require('../utils/constants');

class ForbiddenError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = CODE_ERROR_403;
  }
}

module.exports = ForbiddenError;
