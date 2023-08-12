const { CODE_ERROR_404 } = require('../utils/constants');

class NotFoundError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = CODE_ERROR_404;
  }
}

module.exports = NotFoundError;
