const router = require("express").Router();
const categoryController = require("../Controller/category.controller")
router.get("/", categoryController.getAllCategories);
router.post("/new", categoryController.createCategory);
router.put("/edit/:categoryId", categoryController.editCategory);
router.get("/show/:categoryId", categoryController.showCategory);
router.delete("/delete/:categoryId", categoryController.deleteCategory);
module.exports = router;