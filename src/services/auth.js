import { ConflictError, UnauthorizedError } from "#errors";

import { env } from "#consts";

export class AuthService {
  constructor({ userModel, jwtUtil, hashUtil }) {
    this.User = userModel;
    this.jwt = jwtUtil;
    this.hash = hashUtil;
  }

  async registerUser({ f_name, l_name, email }) {
    // dummy business logic
    return {
      message: "User registered successfully",
      user: {
        id: "user_dummy_123",
        email,
        f_name,
        l_name,
      },
    };
  }

  async loginUser({ email }) {
    return {
      accessToken: "access_dummy_token",
      refreshToken: "refresh_dummy_token",
    };
  }

  async refreshSession(refreshToken) {
    if (!refreshToken) {
      throw new UnauthorizedError({ message: "Missing refresh token" });
    }

    return {
      accessToken: "new_access_dummy_token",
      refreshToken: "new_refresh_dummy_token",
    };
  }

  async logoutUser() {
    return { message: "Logged out" };
  }

  async verifyEmail() {
    return { message: "Email verified" };
  }

  async resendVerification() {
    return { message: "Verification email sent" };
  }

  async forgotPassword() {
    return { message: "Password reset email sent" };
  }

  async resetPassword() {
    return { message: "Password reset successful" };
  }
}
