import { todoApis } from "./api";

export const todoService = {
  async getAllTodos(params) {
    try {
      const response = await todoApis.getAll(params);

      return response.data;
    } catch (error) {
      throw new Error("Notlar alınırken bir hata oluştu: " + error.message);
    }
  },
  async getTodoById(id) {
    try {
      const response = await todoApis.getById(id);
      return response.data;
    } catch (error) {
      throw new Error("Not alınırken bir hata oluştu: " + error.message);
    }
  },
  async createTodo(data) {
    try {
      const response = await todoApis.create(data);
      return response.data;
    } catch (error) {
      throw new Error("Not oluşturulurken bir hata oluştu: " + error.message);
    }
  },
  async updateTodo(id, data) {
    try {
      const response = await todoApis.update(id, data);
      return response.data;
    } catch (error) {
      throw new Error("Not güncellenirken bir hata oluştu: " + error.message);
    }
  },
  async deleteTodo(id) {
    try {
      const response = await todoApis.deleteTodo(id);
      return response.data;
    } catch (error) {
      throw new Error("Not silinirken bir hata oluştu: " + error.message);
    }
  },
  async updateTodoStatus(id, status) {
    try {
      const response = await todoApis.updateStatus(id, status);
      return response.data;
    } catch (error) {
      throw new Error(
        "Not durumu güncellenirken bir hata oluştu: " + error.message
      );
    }
  },

  async searchTodos(params) {
    try {
      const response = await todoApis.search(params);
      return response.data;
    } catch (error) {
      throw new Error("Notlar aranırken bir hata oluştu: " + error.message);
    }
  },

  async getTodoStats() {
    try {
      const response = await todoApis.getStats();
      return response.data;
    } catch (error) {
      throw new Error(
        "Not istatistikleri alınırken bir hata oluştu: " + error.message
      );
    }
  },

  async getTodoPriorityStats() {
    try {
      const response = await todoApis.getPriorityStats();
      return response.data;
    } catch (error) {
      throw new Error(
        "Öncelik durumuna göre not istatistikleri alınırken bir hata oluştu: " +
          error.message
      );
    }
  },
};
