import * as utils from "#utils";

export class AuthController {
  constructor(authService) {
    this.authService = authService;
  }

  register = async (req, res, next) => {
    try {
      const result = await this.authService.registerUser(req.body);

      utils.logger.info({ email: req.body.email }, "AUTH_REGISTER_SUCCESS");

      return res.status(201).json(result);
    } catch (err) {
      next(err);
    }
  };

  login = async (req, res, next) => {
    try {
      const { accessToken, refreshToken } = await this.authService.loginUser(
        req.body,
      );

      utils.logger.info({ email: req.body.email }, "AUTH_LOGIN_SUCCESS");
      res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: "strict",
        maxAge: 7 * 24 * 60 * 60 * 1000,
      });

      return res.status(200).json({ accessToken });
    } catch (err) {
      next(err);
    }
  };

  refresh = async (req, res, next) => {
    try {
      const token = req.cookies?.refreshToken;

      const result = await this.authService.refreshSession(token);

      res.cookie("refreshToken", result.refreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: "strict",
        maxAge: 7 * 24 * 60 * 60 * 1000,
      });

      return res.status(200).json({ accessToken: result.accessToken });
    } catch (err) {
      next(err);
    }
  };

  logout = async (req, res, next) => {
    try {
      await this.authService.logoutUser(req.cookies?.refreshToken);

      res.clearCookie("refreshToken");

      return res.status(200).json({ message: "Logged out" });
    } catch (err) {
      next(err);
    }
  };

  verifyEmail = async (req, res, next) => {
    try {
      const result = await this.authService.verifyEmail(req.body);

      return res.status(200).json(result);
    } catch (err) {
      next(err);
    }
  };

  resendVerification = async (req, res, next) => {
    try {
      const result = await this.authService.resendVerification(req.body);

      return res.status(200).json(result);
    } catch (err) {
      next(err);
    }
  };

  forgotPassword = async (req, res, next) => {
    try {
      const result = await this.authService.forgotPassword(req.body);

      return res.status(200).json(result);
    } catch (err) {
      next(err);
    }
  };

  resetPassword = async (req, res, next) => {
    try {
      const result = await this.authService.resetPassword(req.body);

      return res.status(200).json(result);
    } catch (err) {
      next(err);
    }
  };
}
