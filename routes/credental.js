const router = require("express").Router();
const { CredentalController } = require("../controllers");

router.route("/add").post(CredentalController.addCredentals);

module.exports = router;
