const router = require("express").Router();
const userController = require("../controllers/userController");
router.post("/updateUserDetails", userController.updateUserDetails);

module.exports = router;