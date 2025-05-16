const CategoryService = require("../services/CategoryService");
const { successResponse, errorResponse } = require("../utils/response");

class CategoryController {
  async getAllCategories(req, res) {
    try {
      const categories = await CategoryService.getAllCategories();
      return successResponse(
        res,
        200,
        "Kategoriler başarıyla alındı",
        categories
      );
    } catch (error) {
      return errorResponse(
        res,
        500,
        "Kategoriler alınırken bir hata oluştu",
        error.message
      );
    }
  }

  async getCategoryById(req, res) {
    try {
      const category = await CategoryService.getCategoryById(req.params.id);
      if (!category) {
        return errorResponse(res, 404, "Kategori bulunamadı");
      }
      return successResponse(res, 200, "Kategori başarıyla alındı", category);
    } catch (error) {
      return errorResponse(
        res,
        500,
        "Kategori alınırken bir hata oluştu",
        error.message
      );
    }
  }

  async createCategory(req, res) {
    try {
      const category = await CategoryService.createCategory(req.body);
      return successResponse(
        res,
        201,
        "Kategori başarıyla oluşturuldu",
        category
      );
    } catch (error) {
      return errorResponse(
        res,
        500,
        "Kategori oluşturulurken bir hata oluştu",
        error.message
      );
    }
  }

  async updateCategory(req, res) {
    try {
      const category = await CategoryService.updateCategory(
        req.params.id,
        req.body
      );
      if (!category) {
        return errorResponse(res, 404, "Kategori bulunamadı");
      }
      return successResponse(
        res,
        200,
        "Kategori başarıyla güncellendi",
        category
      );
    } catch (error) {
      return errorResponse(
        res,
        500,
        "Kategori güncellenirken bir hata oluştu",
        error.message
      );
    }
  }

  async deleteCategory(req, res) {
    try {
      const category = await CategoryService.deleteCategory(req.params.id);
      if (!category) {
        return errorResponse(res, 204, "Kategori bulunamadı");
      }
      return successResponse(res, 200, "Kategori başarıyla silindi");
    } catch (error) {
      return errorResponse(
        res,
        500,
        "Kategori silinirken bir hata oluştu",
        error.message
      );
    }
  }

  async getTodosByCategoryId(req, res) {
    try {
      const todos = await CategoryService.getTodosByCategoryId(
        req.params.id,
        req.user.id
      );
      if (!todos) {
        return errorResponse(res, 404, "Bu kategoriye ait notlar bulunamadı");
      }
      return successResponse(res, 200, "Notlar başarıyla alındı", todos);
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

module.exports = new CategoryController();
