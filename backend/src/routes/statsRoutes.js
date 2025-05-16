const express = require("express");
const router = express.Router();
const StatsController = require("../controllers/StatsController");
const { authenticate } = require("../middlewares/authentication");

router.use(authenticate); // Tüm istatistik rotaları için authentication gerekli

router.get("/", StatsController.getStats);
router.get("/priorities", StatsController.getPriorityStats);

module.exports = router;
