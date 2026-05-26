import pino from "pino";

import { env } from "#consts";

export const logger = pino({
  level: env.LOG_LEVEL,

  timestamp: pino.stdTimeFunctions.isoTime,

  base: {
    app: env.APP_NAME,
    env: env.NODE_ENV,
    pid: process.pid,
  },

  formatters: {
    level: (label) => ({
      level: label,
    }),
  },

  redact: {
    paths: [
      "password",
      "confirmPassword",
      "accessToken",
      "refreshToken",
      "token",
      "authorization",
      "req.headers.authorization",
      "req.headers.cookie",
      "cookies",
      "*.password",
      "*.token",
    ],
    remove: true,
  },

  serializers: {
    err: pino.stdSerializers.err,
    req: pino.stdSerializers.req,
    res: pino.stdSerializers.res,
  },
});
