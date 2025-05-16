const jwt = require("jsonwebtoken");
const AuthRepository = require("../repositories/AuthRepository");

class AuthService {
  async register(userData) {
    // Email kontrolü
    const existingUser = await AuthRepository.FindByEmail(userData.email);
    if (existingUser) {
      throw new Error("Bu email adresi zaten kayıtlı");
    }

    // Yeni kullanıcı oluştur
    const user = await AuthRepository.Create(userData);
    if (!user) {
      throw new Error("Kullanıcı oluşturulamadı");
    }

    // Token oluştur
    const token = this.generateToken(user);

    return { user, token };
  }

  async login(credentials) {
    // Kullanıcı kontrolü
    const user = await AuthRepository.FindByEmail(credentials.email);
    if (!user) {
      throw new Error("Email veya şifre hatalı");
    }

    // Şifre kontrolü
    const isMatch = await user.comparePassword(credentials.password);
    if (!isMatch) {
      throw new Error("Email veya şifre hatalı");
    }

    // Token oluştur
    const token = this.generateToken(user);

    return { user, token };
  }

  async getUserById(id) {
    const user = await AuthRepository.FindById(id);
    if (!user) {
      throw new Error("Kullanıcı bulunamadı");
    }
    return user;
  }

  async updateUser(id, updates) {
    const user = await AuthRepository.Update(id, updates);
    if (!user) {
      throw new Error("Kullanıcı güncellenemedi");
    }
    return user;
  }

  generateToken(user) {
    return jwt.sign(
      { userId: user.id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );
  }

  async verifyToken(token) {
    try {
      return jwt.verify(token, process.env.JWT_SECRET);
    } catch (error) {
      if (error.name === "JsonWebTokenError") {
        throw new Error("Geçersiz token");
      }
      if (error.name === "TokenExpiredError") {
        throw new Error("Token süresi dolmuş");
      }
      throw new Error("Token doğrulama hatası");
    }
  }
}

module.exports = new AuthService();
