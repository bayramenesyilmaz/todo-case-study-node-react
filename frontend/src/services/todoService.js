import { todoApis } from "./api";

export const todoService = {
  async getAllTodos(params) {
    try {
      const response = await todoApis.getAll(params);

      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || "Notlar alınırken bir hata oluştu: "
      );
    }
  },
  async getTodoById(id) {
    try {
      const response = await todoApis.getById(id);
      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || "Not alınırken bir hata oluştu: "
      );
    }
  },
  async createTodo(data) {
    try {
      const response = await todoApis.create(data);
      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || "Not oluşturulurken bir hata oluştu: "
      );
    }
  },
  async updateTodo(id, data) {
    try {
      const response = await todoApis.update(id, data);
      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || "Not güncellenirken bir hata oluştu: "
      );
    }
  },
  async deleteTodo(id) {
    try {
      const response = await todoApis.deleteTodo(id);
      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || "Not silinirken bir hata oluştu: "
      );
    }
  },
  async updateTodoStatus(id, status) {
    try {
      const response = await todoApis.updateStatus(id, status);
      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message ||
          "Not durumu güncellenirken bir hata oluştu: "
      );
    }
  },

  async searchTodos(params) {
    try {
      const response = await todoApis.search(params);
      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || "Notlar aranırken bir hata oluştu: "
      );
    }
  },

  async getTodoStats() {
    try {
      const response = await todoApis.getStats();
      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message ||
          "Not istatistikleri alınırken bir hata oluştu: "
      );
    }
  },

  async getTodoPriorityStats() {
    try {
      const response = await todoApis.getPriorityStats();
      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message ||
          "Öncelik durumuna göre not istatistikleri alınırken bir hata oluştu: "
      );
    }
  },
};
