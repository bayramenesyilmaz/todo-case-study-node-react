const TodoService = require("../services/TodoService");
const { successResponse, errorResponse } = require("../utils/response");

class StatsController {
  async getStats(req, res) {
    try {
      const stats = await TodoService.getStats(req.user.id);
      return successResponse(res, 200, "İstatistikler başarıyla alındı", stats);
    } catch (error) {
      return errorResponse(
        res,
        500,
        "İstatistikler alınırken bir hata oluştu",
        error.message
      );
    }
  }

  async getPriorityStats(req, res) {
    try {
      const stats = await TodoService.getPriorityStats(req.user.id);
      return successResponse(
        res,
        200,
        "Öncelik istatistikleri başarıyla alındı",
        stats
      );
    } catch (error) {
      return errorResponse(
        res,
        500,
        "Öncelik istatistikleri alınırken bir hata oluştu",
        error.message
      );
    }
  }
}
module.exports = new StatsController();
