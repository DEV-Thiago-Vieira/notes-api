class AppError extends Error {
  constructor(message, statusCode, details = null) {
    super(message);
    this.statusCode = statusCode;
    this.name = this.constructor.name;
    this.details = details;

    Error.captureStackTrace(this, this.constructor);
  }
}

class NotFoundError extends AppError {
  constructor(message = "Resource not found", details = null) {
    super(message, 404, details);
  }
}

class BadRequestError extends AppError {
  constructor(message = "Bad request", details = null) {
    super(message, 400, details);
  }
}

class UnauthorizedError extends AppError {
  constructor(message = "Unauthorized", details = null) {
    super(message, 401, details);
  }
}

class ForbiddenError extends AppError {
  constructor(message = "Forbidden", details = null) {
    super(message, 403, details);
  }
}

module.exports = {
  AppError,
  NotFoundError,
  BadRequestError,
  UnauthorizedError,
  ForbiddenError,
};
