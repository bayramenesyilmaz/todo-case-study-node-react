const Todo = require("../models/Todo");
const User = require("../models/User");
const AuthService = require("../services/AuthService");
const { errorResponse } = require("../utils/response");

const authenticate = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return errorResponse(res, 401, "Yetkilendirme token'ı bulunamadı");
    }

    const decoded = await AuthService.verifyToken(token);

    req.user = {
      id: decoded.userId,
      role: decoded.role, // Role bilgisi eklendi
    };
    next();
  } catch (error) {
    return errorResponse(res, 401, error.message);
  }
};

const canDeleteTodo = async (req, res, next) => {
  try {
    const todo = await Todo.findById(req.params.id);
    if (!todo) {
      return errorResponse(res, 404, "Not bulunamadı");
    }

    // Sadece admin veya todo'nun sahibi silebilir
    if (req.user.role !== "admin" && todo.owner_id.toString() !== req.user.id) {
      return errorResponse(res, 403, "Bu notu silme yetkiniz yok");
    }

    next();
  } catch (error) {
    return errorResponse(
      res,
      500,
      "Yetkilendirme kontrolü sırasında bir hata oluştu",
      error.message
    );
  }
};

const canAccessTodo = async (req, res, next) => {
  try {
    const todo = await Todo.findById(req.params.id);
    if (!todo) {
      return errorResponse(res, 404, "Not bulunamadı");
    }

    // Kullanıcı admin ise direkt erişim sağlanır
    if (req.user.role === "admin") {
      next();
      return;
    }

    // Todo'nun sahibi veya paylaşılan kullanıcılardan biri mi kontrol et
    const hasAccess =
      todo.owner_id.toString() === req.user.id ||
      todo.shared_with.some((userId) => userId.toString() === req.user.id);

    if (!hasAccess) {
      return errorResponse(res, 403, "Bu nota erişim yetkiniz yok");
    }

    // Todo bilgisini request nesnesine ekle
    req.todo = todo;
    next();
  } catch (error) {
    return errorResponse(
      res,
      500,
      "Yetkilendirme kontrolü sırasında bir hata oluştu",
      error.message
    );
  }
};

const convertEmailsToUserIds = async (req, res, next) => {
  try {
    if (req.body.shared_with && Array.isArray(req.body.shared_with)) {
      const emails = req.body.shared_with;

      // Email'leri kullanıcı ID'lerine dönüştür
      const users = await User.find({ email: { $in: emails } });

      // Bulunamayan emailleri kontrol et
      const foundEmails = users.map((user) => user.email);
      const notFoundEmails = emails.filter(
        (email) => !foundEmails.includes(email)
      );

      if (notFoundEmails.length > 0) {
        return errorResponse(
          res,
          400,
          `Bu email adresleri sistemde bulunamadı: ${notFoundEmails.join(", ")}`
        );
      }

      // Email'leri ID'lere dönüştür
      req.body.shared_with = users.map((user) => user._id.toString());
    }
    next();
  } catch (error) {
    return errorResponse(res, 500, "Email dönüşümü sırasında bir hata oluştu");
  }
};

module.exports = {
  authenticate,
  canDeleteTodo,
  canAccessTodo,
  convertEmailsToUserIds,
};
