// server.js
import "./env-config.js";

import http from "http";

import { app } from "./app.js";
import { env } from "#consts";
import * as utils from "#utils";
import * as config from "#config";

const httpServer = http.createServer(app);

httpServer.on("listening", () => {
  utils.logger.info({ service: "auth" }, "NODE_LOKI_TEST");
  utils.logger.info(`${env.APP_NAME} server running at ${env.APP_URL}`);
});

httpServer.on("error", (error) => {
  switch (error.code) {
    case "EADDRINUSE":
      utils.logger.fatal(
        { message: `Port ${env.PORT} is already in use` },
        `failed to start server at PORT ${env.PORT}`,
      );
      break;
    case "EACCES":
      utils.logger.fatal(
        { message: `Port ${env.PORT} requires elevated privileges` },
        `failed to start server at PORT ${env.PORT}`,
      );
      break;
    default:
      utils.logger.fatal(
        { message: `server error: ${error}` },
        `failed to start server`,
      );
  }
  process.exit(1);
});

let shuttingDown = false;
function shutdown() {
  if (shuttingDown) return;
  shuttingDown = true;

  utils.logger.info("Shutting down server...");

  httpServer.close(() => {
    process.exit(0);
  });
}

process.on("uncaughtException", (error) => {
  utils.logger.fatal(`Uncaught Exception: ${error}`);
  shutdown();
});

process.on("unhandledRejection", (reason) => {
  utils.logger.fatal(`Unhandled Rejection: ${reason}`);
  shutdown();
});

process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);

const startServer = async () => {
  try {
    // await config.connectMongoDB(env.TEST_DB_URL);
    httpServer.listen(env.PORT);
  } catch (error) {
    utils.logger.fatal(`failed to start server\n${error}`);
    process.exit(1);
  }
};

startServer();
