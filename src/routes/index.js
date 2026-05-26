import express from "express";

import { authRouter } from "./auth-router.js";

export const apiV1Router = express.Router();
apiV1Router.use("/auth", authRouter);
