const router = require("express").Router();
const postController = require("../controllers/productController");
const requireUser = require("../middleware/requireUser");
router.post("/add", postController.addNewProducts);
router.get("/getProducts", postController.getAllProducts);
router.post("/editProduct", postController.editProduct);
router.post("/deleteProduct", postController.deleteProduct);

module.exports = router;
