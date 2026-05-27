import express from "express";

import { handleReqErrors } from "#errors";
import { apiV1Router } from "#routes";

export const app = express();
app
  .use(express.json())
  .use(express.urlencoded({ extended: true }))
  .use(express.static("public"))
  .use("/api/v1", apiV1Router)
  .use((req, res) => {
    return res.status(400).json({ message: "page not found :(" });
  })
  .use(handleReqErrors);

// hello, this is the discord-github webhook testing message
