const router = require("express").Router();

const productController = require("../Controller/product.controller")
router.get("/", productController.getAllProducts);
router.post("/new", productController.createProduct); //create new product
router.put("/edit/:productId", productController.editProduct);
router.get("/show/:productId", productController.showProduct);
router.delete("/delete/:productId", productController.deleteProduct);

module.exports = router;