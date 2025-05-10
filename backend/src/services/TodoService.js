const TodoRepository = require("../repositories/TodoRepository");

class TodoService {
  async getAllTodos(query) {
    const todos = await TodoRepository.FindAll(query);
    return todos;
  }

  async getTodoById(id) {
    const todo = await TodoRepository.FindById(id);
    if (!todo) {
      throw new Error("Todo not found");
    }
    return todo;
  }

  async createTodo(todoData) {
    const todo = await TodoRepository.Create(todoData);
    if (!todo) {
      throw new Error("Failed to create todo");
    }
    return todo;
  }

  async updateTodo(id, todoData) {
    const todo = await TodoRepository.Update(id, todoData);
    if (!todo) {
      throw new Error("Failed to update todo");
    }
    return todo;
  }

  async updateTodoStatus(id, status) {
    const todo = await TodoRepository.UpdateStatus(id, status);
    if (!todo) {
      throw new Error("Failed to update todo status");
    }
    return todo;
  }

  async deleteTodo(id) {
    const todo = await TodoRepository.Delete(id);
    if (!todo) {
      throw new Error("Failed to delete todo");
    }
    return todo;
  }

  async searchTodos(query) {
    const todos = await TodoRepository.Search(query);
    if (!todos) {
      throw new Error("Failed to search todos");
    }
    return todos;
  }
}

module.exports = new TodoService();
