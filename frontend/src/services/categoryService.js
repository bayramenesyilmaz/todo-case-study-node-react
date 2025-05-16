import { categoryApis } from "./api";

export const categoryService = {
  // Tüm kategorileri getir
  async getAllCategories() {
    try {
      const response = await categoryApis.getAll();
      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message ||
          "Kategoriler alınırken bir hata oluştu: "
      );
    }
  },

  // ID'ye göre kategori getir
  async getCategoryById(id) {
    try {
      const response = await categoryApis.getById(id);
      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || "Kategori alınırken bir hata oluştu: "
      );
    }
  },

  // Yeni kategori oluştur
  async createCategory(data) {
    try {
      const response = await categoryApis.create(data);
      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message ||
          "Kategori oluşturulurken bir hata oluştu: "
      );
    }
  },

  // Kategori güncelle
  async updateCategory(id, data) {
    try {
      const response = await categoryApis.update(id, data);
      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message ||
          "Kategori güncellenirken bir hata oluştu: "
      );
    }
  },

  // Kategori sil
  async deleteCategory(id) {
    try {
      const response = await categoryApis.delete(id);
      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || "Kategori silinirken bir hata oluştu: "
      );
    }
  },

  // Kategoriye ait todoları getir
  async getTodosByCategory(id) {
    try {
      const response = await categoryApis.getTodos(id);
      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message ||
          "Kategoriye ait görevler alınırken bir hata oluştu: "
      );
    }
  },
};
