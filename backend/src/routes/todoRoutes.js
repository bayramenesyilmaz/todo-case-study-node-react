const express = require("express");
const TodoController = require("../controllers/TodoController");
const validator = require("../middlewares/validator.js");
const {
  authenticate,
  canDeleteTodo,
  canAccessTodo,
  convertEmailsToUserIds,
} = require("../middlewares/authentication");

const {
  createTodoSchema,
  updateTodoSchema,
  updateStatusSchema,
} = require("../validations/todoValidation");

const router = express.Router();

router.get("/", authenticate, TodoController.getAllTodos);
router.get("/search", authenticate, TodoController.searchTodos);
router.get("/:id", authenticate, canAccessTodo, TodoController.getTodoById);

router.post(
  "/",
  authenticate,
  convertEmailsToUserIds,
  validator(createTodoSchema),
  TodoController.createTodo
);
router.put(
  "/:id",
  authenticate,
  convertEmailsToUserIds,
  validator(updateTodoSchema),
  TodoController.updateTodo
);
router.patch(
  "/:id/status",
  authenticate,
  validator(updateStatusSchema),
  TodoController.updateTodoStatus
);

router.delete("/:id", authenticate, canDeleteTodo, TodoController.deleteTodo);

module.exports = router;
