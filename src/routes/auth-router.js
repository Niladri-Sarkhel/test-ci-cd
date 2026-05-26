/*
POST   /api/v1/auth/register
POST   /api/v1/auth/login
POST   /api/v1/auth/refresh
POST   /api/v1/auth/logout

POST   /api/v1/auth/verify-email
POST   /api/v1/auth/resend-verification

POST   /api/v1/auth/forgot-password
POST   /api/v1/auth/reset-password
*/

import express from "express";

import { AuthController } from "#controllers";
import { AuthService } from "#services";

const authService = new AuthService({}, {}, {});
const authController = new AuthController(authService);

export const authRouter = express.Router();
authRouter
  .post("/register", authController.register)
  .post("/login", authController.login)
  .post("/refresh", authController.refresh)
  .post("/logout", authController.logout)
  .post("/verify-email", authController.verifyEmail)
  .post("/resend-verification", authController.resendVerification)
  .post("/forgot-password", authController.forgotPassword)
  .post("/reset-password", authController.resetPassword);
