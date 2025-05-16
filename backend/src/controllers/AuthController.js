const AuthService = require("../services/AuthService");
const { successResponse, errorResponse } = require("../utils/response");
const logger = require("../utils/logger");

class AuthController {
  async register(req, res) {
    try {
      const { user, token } = await AuthService.register(req.body);
      return successResponse(res, 201, "Kayıt başarılı", { user, token });
    } catch (error) {
      const statusCode =
        error.message === "Bu email adresi zaten kayıtlı" ? 400 : 500;
      return errorResponse(res, statusCode, error.message);
    }
  }

  async login(req, res) {
    try {
      const { user, token } = await AuthService.login(req.body);
      return successResponse(res, 200, "Giriş başarılı", { user, token });
    } catch (error) {
      return errorResponse(res, 401, error.message);
    }
  }

  async getMe(req, res) {
    try {
      const user = await AuthService.getUserById(req.user.userId);
      return successResponse(res, 200, "Kullanıcı bilgileri", { user });
    } catch (error) {
      return errorResponse(res, 404, error.message);
    }
  }

  async updateMe(req, res) {
    try {
      const user = await AuthService.updateUser(req.user.userId, req.body);
      return successResponse(res, 200, "Kullanıcı güncellendi", { user });
    } catch (error) {
      return errorResponse(res, 400, error.message);
    }
  }
}

module.exports = new AuthController();
