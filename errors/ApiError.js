const { ERROR_MESSAGES } = require('../utils/constants');

const {
  FORBIDDEN,
  BAD_REQUEST,
  NOT_FOUND,
  INTERNAL,
  EMAIL_CONFLICT,
  UNAUTHORIZED,
} = ERROR_MESSAGES;

class ApiError extends Error {
  constructor(status, message) {
    super();
    this.status = status;
    this.message = message;
  }

  static badRequest(message = BAD_REQUEST) {
    return new ApiError(400, message);
  }

  static unauthorized(message = UNAUTHORIZED) {
    return new ApiError(401, message);
  }

  static forbidden(message = FORBIDDEN) {
    return new ApiError(403, message);
  }

  static notFound(message = NOT_FOUND) {
    return new ApiError(404, message);
  }

  static conflict(message = EMAIL_CONFLICT) {
    return new ApiError(409, message);
  }

  static iternal(message = INTERNAL) {
    return new ApiError(500, message);
  }
}

module.exports = { ApiError };
