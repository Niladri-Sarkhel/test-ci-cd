import * as utils from "#utils";

export class AppError extends Error {
  constructor({
    message = "Internal Server Error",
    statusCode = 500,
    errors = [],
    metadata = {},
    isOperational = true,
  }) {
    super(message);

    this.name = this.constructor.name;
    this.statusCode = statusCode;
    this.errors = errors;
    this.metadata = metadata;
    this.isOperational = isOperational;

    Error.captureStackTrace(this, this.constructor);
  }
}

export class ConflictError extends AppError {
  constructor({ message = "Resource conflict", errors = [], metadata = {} }) {
    super({
      message,
      statusCode: 409,
      errors,
      metadata,
    });
  }
}

export class NotFoundError extends AppError {
  constructor({ message = "Resource not found", errors = [], metadata = {} }) {
    super({
      message,
      statusCode: 404,
      errors,
      metadata,
    });
  }
}

export class UnauthorizedError extends AppError {
  constructor({ message = "Unauthorized", errors = [], metadata = {} }) {
    super({
      message,
      statusCode: 401,
      errors,
      metadata,
    });
  }
}

export class ValidationError extends AppError {
  constructor({ message = "Validation failed", errors = [], metadata = {} }) {
    super({
      message,
      statusCode: 422,
      errors,
      metadata,
    });
  }
}

export const normalizeError = (err) => {
  if (err instanceof AppError) {
    return err;
  }

  return new AppError({
    message: err?.message || "Unhandled error",
    statusCode: 500,
    errors: ["Internal server error"],
    isOperational: false,
    metadata: {
      originalError: err?.name,
    },
  });
};

export const handleReqErrors = (err, req, res, next) => {
  const error = normalizeError(err);

  utils.logger.error(
    {
      err,

      request: {
        id: req.id,
        method: req.method,
        path: req.originalUrl,
        ip: req.ip,
        userAgent: req.headers["user-agent"],
      },

      user: {
        email: req.body?.email,
        id: req.user?.id,
      },

      error: {
        name: error.name,
        message: error.message,
        statusCode: error.statusCode,
        errors: error.errors,
        metadata: error.metadata,
        isOperational: error.isOperational,
        stack: error.stack,
      },
    },
    error.message,
  );

  res.status(error.statusCode).json({
    success: false,
    data: null,
    error: {
      code: error.name,
      message: error.message,
      details: error.errors,
    },
  });
};
