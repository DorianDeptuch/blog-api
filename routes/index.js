var express = require("express");
var router = express.Router();
const indexController = require("../controllers/indexController");

/* GET home page. */
router.get("/", indexController.index_get);

router.get("/about", indexController.about_get);

router.get("/contact", indexController.contact_get);

module.exports = router;
