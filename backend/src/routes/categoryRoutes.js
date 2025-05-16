const express = require("express");
const CategoryController = require("../controllers/CategoryController");
const validator = require("../middlewares/validator.js");
const {
  createCategorySchema,
  updateCategorySchema,
} = require("../validations/categoryValidation");

const router = express.Router();

const { authenticate } = require("../middlewares/authentication");

router.use(authenticate); // Tüm istatistik rotaları için authentication gerekli

router.get("/", CategoryController.getAllCategories);
router.get("/:id", CategoryController.getCategoryById);
router.get("/:id/todos", CategoryController.getTodosByCategoryId);

router.post(
  "/",
  validator(createCategorySchema),
  CategoryController.createCategory
);
router.put(
  "/:id",
  validator(updateCategorySchema),
  CategoryController.updateCategory
);
router.delete("/:id", CategoryController.deleteCategory);

module.exports = router;
