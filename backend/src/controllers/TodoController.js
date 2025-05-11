const TodoService = require("../services/TodoService");
const { successResponse, errorResponse } = require("../utils/response");
const logger = require("../utils/logger");
class TodoController {
  async getAllTodos(req, res) {
    try {
      const result = await TodoService.getAllTodos(req.query);
      return successResponse(
        res,
        200,
        "Notlar başarıyla alındı",
        result.todos,
        { pagination: result.pagination }
      );
    } catch (error) {
      return errorResponse(
        res,
        500,
        "Notlar alınırken bir hata oluştu",
        error.message
      );
    }
  }
  async getTodoById(req, res) {
    try {
      const todo = await TodoService.getTodoById(req.params.id);
      if (!todo) {
        return errorResponse(res, 404, "Not bulunamadı");
      }
      return successResponse(res, 200, "Not başarıyla alındı", todo);
    } catch (error) {
      return errorResponse(
        res,
        500,
        "Not alınırken bir hata oluştu",
        error.message
      );
    }
  }

  async createTodo(req, res) {
    try {
      const todo = await TodoService.createTodo(req.body);
      // const formattedTodo = {
      //   id: todo._id,
      //   title: todo.title,
      //   description: todo.description,
      //   status: todo.status,
      //   priority: todo.priority,
      //   due_date: todo.due_date,
      //   created_at: todo.created_at,
      //   updated_at: todo.updated_at,
      //   categories: todo.category_ids,
      // };
      return successResponse(res, 201, "Not başarıyla oluşturuldu", todo);
    } catch (error) {
      return errorResponse(
        res,
        500,
        "Not oluşturulurken bir hata oluştu",
        error.message
      );
    }
  }
  async updateTodo(req, res) {
    try {
      const todo = await TodoService.updateTodo(req.params.id, req.body);
      if (!todo) {
        return errorResponse(res, 404, "Not bulunamadı");
      }
      return successResponse(res, 200, "Not güncelleme işlemi başarılı", todo);
    } catch (error) {
      return errorResponse(
        res,
        500,
        "Not güncelleme işlemi yapılırken bir hata oluştu",
        error.message
      );
    }
  }
  async updateTodoStatus(req, res) {
    try {
      const todo = await TodoService.updateTodoStatus(
        req.params.id,
        req.body.status
      );
      if (!todo) {
        return errorResponse(res, 404, "Not bulunamadı");
      }
      return successResponse(res, 200, "Not durumu başarıyla güncellendi", {
        id: todo._id,
        status: todo.status,
        updated_at: todo.updated_at,
      });
    } catch (error) {
      return errorResponse(
        res,
        500,
        "Not durumu güncellenirken bir hata oluştu",
        error.message
      );
    }
  }
  async deleteTodo(req, res) {
    try {
      const todo = await TodoService.deleteTodo(req.params.id);
      if (!todo) {
        return errorResponse(res, 404, "Not bulunamadı");
      }
      return successResponse(res, 200, "Not silme işlemi başarılı");
    } catch (error) {
      return errorResponse(
        res,
        500,
        "Not silme işlemi yapılırken bir hata oluştu",
        error.message
      );
    }
  }
  async searchTodos(req, res) {
    try {
      const result = await TodoService.searchTodos(req.query);
      if (!result) {
        return errorResponse(res, 404, "Not bulunamadı");
      }

      return successResponse(
        res,
        200,
        "Notlar başarıyla alındı",
        result.todos,
        { pagination: result.pagination }
      );
    } catch (error) {
      return errorResponse(
        res,
        500,
        "Notlar alınırken bir hata oluştu",
        error.message
      );
    }
  }
}
module.exports = new TodoController();
