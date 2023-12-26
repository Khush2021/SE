const router = require("express").Router();
const orderController = require("../controllers/orderController");
const requireUser = require("../middleware/requireUser");
//console.log("heelo");
router.post("/add", orderController.addNewOrders);
router.get("/getAll", orderController.getAllOrders);
router.get("/getLatest", orderController.getLatestOrders);
router.put("/update/:id", orderController.updateOrderStatus);
router.delete("/deleteOrder/:id", orderController.deleteOrder);
router.post("/updateOrder", orderController.updateOrder)
//  requireUser,
module.exports = router;
