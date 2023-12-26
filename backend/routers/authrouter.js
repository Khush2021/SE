const router = require("express").Router();
const authoController = require("../controllers/autocontroller");

router.post("/signup", authoController.signUpController);
router.post("/login", authoController.loginController);
router.post("/refresh", authoController.refreshAccessTokenController);

module.exports = router;
