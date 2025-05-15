const express = require("express");
const StatsController = require("../controllers/StatsController");

const router = express.Router();

router.get("/", StatsController.getStats);
router.get("/priorities", StatsController.getPriorityStats);

module.exports = router;
