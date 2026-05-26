import jwt from "jsonwebtoken";

import { env } from "#consts";

const ACCESS_SECRET = env.JWT_ACCESS_SECRET;
const REFRESH_SECRET = env.JWT_REFRESH_SECRET;

export const jwtUtil = {
  generateAccessToken(payload) {
    return jwt.sign(payload, ACCESS_SECRET, { expiresIn: "15m" });
  },

  generateRefreshToken(payload) {
    return jwt.sign(payload, REFRESH_SECRET, { expiresIn: "7d" });
  },

  verifyAccessToken(token) {
    return jwt.verify(token, ACCESS_SECRET);
  },

  verifyRefreshToken(token) {
    return jwt.verify(token, REFRESH_SECRET);
  },
};
