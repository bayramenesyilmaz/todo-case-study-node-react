const TodoService = require("../services/TodoService");
const { successResponse, errorResponse } = require("../utils/response");

class TodoController {
  async getAllTodos(req, res) {
    try {
      const result = await TodoService.getAllTodos(req.query);
      return successResponse(
        res,
        200,
        "Todos retrieved successfully",
        result.todos,
        { pagination: result.pagination }
      );
    } catch (error) {
      return errorResponse(res, 500, "Failed to retrieve todos", error.message);
    }
  }
  async getTodoById(req, res) {
    try {
      const todo = await TodoService.getTodoById(req.params.id);
      if (!todo) {
        return errorResponse(res, 404, "Todo not found");
      }
      return successResponse(res, 200, "Todo retrieved successfully", todo);
    } catch (error) {
      return errorResponse(res, 500, "Failed to retrieve todo", error.message);
    }
  }

  async createTodo(req, res) {
    try {
      const todo = await TodoService.createTodo(req.body);
      const formattedTodo = {
        id: todo._id,
        title: todo.title,
        description: todo.description,
        status: todo.status,
        priority: todo.priority,
        due_date: todo.due_date,
        created_at: todo.created_at,
        updated_at: todo.updated_at,
        categories: todo.categories,
      };
      return successResponse(
        res,
        201,
        "Todo başarıyla oluşturuldu",
        formattedTodo
      );
    } catch (error) {
      return errorResponse(
        res,
        500,
        "Todo oluşturulurken bir hata oluştu",
        error.message
      );
    }
  }
  async updateTodo(req, res) {
    try {
      const todo = await TodoService.updateTodo(req.params.id, req.body);
      if (!todo) {
        return errorResponse(res, 404, "Todo not found");
      }
      return successResponse(res, 200, "Todo updated successfully", todo);
    } catch (error) {
      return errorResponse(res, 500, "Failed to update todo", error.message);
    }
  }
  async updateTodoStatus(req, res) {
    try {
      const todo = await TodoService.updateTodoStatus(
        req.params.id,
        req.body.status
      );
      if (!todo) {
        return errorResponse(res, 404, "Todo not found");
      }
      return successResponse(
        res,
        200,
        "Todo status updated successfully",
        todo
      );
    } catch (error) {
      return errorResponse(
        res,
        500,
        "Failed to update todo status",
        error.message
      );
    }
  }
  async deleteTodo(req, res) {
    try {
      const todo = await TodoService.deleteTodo(req.params.id);
      if (!todo) {
        return errorResponse(res, 404, "Todo not found");
      }
      return successResponse(res, 200, "Todo deleted successfully", todo);
    } catch (error) {
      return errorResponse(res, 500, "Failed to delete todo", error.message);
    }
  }
  async searchTodos(req, res) {
    try {
      const todos = await TodoService.searchTodos(req.query);
      return successResponse(res, 200, "Todos retrieved successfully", todos);
    } catch (error) {
      return errorResponse(res, 500, "Failed to search todos", error.message);
    }
  }
}
module.exports = new TodoController();
