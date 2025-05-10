const express = require("express");
const TodoController = require("../controllers/TodoController");
const validator = require("../middlewares/validator.js");
const {
  createTodoSchema,
  updateTodoSchema,
  updateStatusSchema,
} = require("../validations/todoValidation");

const router = express.Router();

router.get("/", TodoController.getAllTodos);
router.get("/search", TodoController.searchTodos);
router.get("/:id", TodoController.getTodoById);

router.post("/", validator(createTodoSchema), TodoController.createTodo);
router.put("/:id", validator(updateTodoSchema), TodoController.updateTodo);
router.patch(
  "/:id/status",
  validator(updateStatusSchema),
  TodoController.updateTodoStatus
);

router.delete("/:id", TodoController.deleteTodo);

module.exports = router;
