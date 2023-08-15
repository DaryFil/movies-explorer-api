const { CODE_ERROR_400 } = require('../utils/constants');

class BadRequest extends Error {
  constructor(message) {
    super(message);
    this.statusCode = CODE_ERROR_400;
  }
}

module.exports = BadRequest;
