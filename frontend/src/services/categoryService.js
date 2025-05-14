import { categoryApis } from "./api";

export const categoryService = {
  // Tüm kategorileri getir
  async getAllCategories() {
    try {
      const response = await categoryApis.getAll();
      return response.data;
    } catch (error) {
      throw new Error(
        "Kategoriler alınırken bir hata oluştu: " + error.message
      );
    }
  },

  // ID'ye göre kategori getir
  async getCategoryById(id) {
    try {
      const response = await categoryApis.getById(id);
      return response.data;
    } catch (error) {
      throw new Error("Kategori alınırken bir hata oluştu: " + error.message);
    }
  },

  // Yeni kategori oluştur
  async createCategory(data) {
    try {
      const response = await categoryApis.create(data);
      return response.data;
    } catch (error) {
      throw new Error(
        "Kategori oluşturulurken bir hata oluştu: " + error.message
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
        "Kategori güncellenirken bir hata oluştu: " + error.message
      );
    }
  },

  // Kategori sil
  async deleteCategory(id) {
    try {
      const response = await categoryApis.delete(id);
      return response.data;
    } catch (error) {
      throw new Error("Kategori silinirken bir hata oluştu: " + error.message);
    }
  },

  // Kategoriye ait todoları getir
  async getTodosByCategory(id) {
    try {
      const response = await categoryApis.getTodos(id);
      return response.data;
    } catch (error) {
      throw new Error(
        "Kategoriye ait görevler alınırken bir hata oluştu: " + error.message
      );
    }
  },
};
