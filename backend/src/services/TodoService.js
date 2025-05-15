const TodoRepository = require("../repositories/TodoRepository");

class TodoService {
  async getAllTodos(query) {
    const todos = await TodoRepository.FindAll(query);
    if (!todos) {
      throw new Error("Notlar alınırken bir hata oluştu");
    }
    return todos;
  }

  async getTodoById(id) {
    const todo = await TodoRepository.FindById(id);
    if (!todo) {
      return null;
    }
    return todo;
  }

  async createTodo(todoData) {
    const todo = await TodoRepository.Create(todoData);
    if (!todo) {
      throw new Error("Not oluşturulamadı");
    }
    return todo;
  }

  async updateTodo(id, todoData) {
    const todo = await TodoRepository.Update(id, todoData);
    if (!todo) {
      throw new Error("Not güncellenemedi");
    }
    return todo;
  }

  async updateTodoStatus(id, status) {
    const todo = await TodoRepository.UpdateStatus(id, status);
    if (!todo) {
      throw new Error("Notun durumu güncellenemedi");
    }
    return todo;
  }

  async deleteTodo(id) {
    const todo = await TodoRepository.Delete(id);
    if (!todo) {
      return null;
    }
    return todo;
  }

  async searchTodos(query) {
    const todos = await TodoRepository.Search(query);
    if (!todos) {
      return null;
    }
    return todos;
  }

  async getStats() {
    const stats = await TodoRepository.GetStats();
    if (!stats) {
      throw new Error("İstatistikler alınırken bir hata oluştu");
    }
    return stats;
  }

  async getPriorityStats() {
    const stats = await TodoRepository.GetPriorityStats();
    if (!stats) {
      throw new Error("Öncelik istatistikleri alınırken bir hata oluştu");
    }
    return stats;
  }
}

module.exports = new TodoService();
