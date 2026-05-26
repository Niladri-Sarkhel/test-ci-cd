import joi from "joi";

const envSchema = joi
  .object({
    NODE_ENV: joi
      .string()
      .valid("development", "test", "production")
      .required(),

    PORT: joi.number().required(),

    APP_NAME: joi.string().required(),

    APP_URL: joi.string().uri().required(),

    MONGODB_URI: joi.string().uri().required(),

    JWT_ACCESS_TOKEN_SECRET: joi.string().min(32).required(),

    JWT_REFRESH_TOKEN_SECRET: joi.string().min(32).required(),

    PASSWORD_SALT_ROUNDS: joi.number().integer().min(4).max(15).required(),

    LOG_LEVEL: joi
      .string()
      .valid("fatal", "error", "warn", "info", "debug", "trace")
      .required(),

    LOGIN_MAX_ATTEMPTS: joi.number().integer().min(1).max(10).required(),

    USER_MAX_SESSIONS: joi.number().integer().min(1).max(10).required(),
  })
  .unknown();

const { value, error } = envSchema.validate(process.env, { abortEarly: false });

if (error) {
  const errors = [];
  for (const detail of error.details) {
    errors.push(detail.message);
  }

  console.log({
    message: "❌ failed to start server due to invalid environment variables",
    errors,
  });

  process.exit(1);
}

export const env = Object.freeze(value);
