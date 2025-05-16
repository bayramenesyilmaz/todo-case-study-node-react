import { authApis } from "./api";

export const authService = {
  // Kullanıcı kaydı
  async register(data) {
    try {
      const response = await authApis.register(data);
      return response; // Tüm yanıtı döndür
    } catch (error) {
      throw new Error(
        error.response?.data?.message ||
          "Kayıt işlemi sırasında bir hata oluştu"
      );
    }
  },

  // Kullanıcı girişi
  async login(data) {
    try {
      const response = await authApis.login(data);
      return response; // Tüm yanıtı döndür
    } catch (error) {
      throw new Error(
        error.response?.data?.message ||
          "Giriş işlemi sırasında bir hata oluştu"
      );
    }
  },

  // Kullanıcı bilgilerini al
  async getMe(token) {
    try {
      const response = await authApis.getMe(token);
      return response; // Tüm yanıtı döndür
    } catch (error) {
      throw new Error(
        error.response?.data?.message ||
          "Kullanıcı bilgileri alınırken bir hata oluştu"
      );
    }
  },
};
