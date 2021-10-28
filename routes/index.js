var express = require("express");
var router = express.Router();
const indexController = require("../controllers/indexController");

/* GET home page. */
router.get("/", indexController.index_get);

router.get("/about", indexController.about_get);

router.get("/contact", indexController.contact_get);

router.get("/login", indexController.login_get);

router.post("/login", indexController.login_post);

router.get("/signup", indexController.signup_get);

router.post("/signup", indexController.signup_post);

router.get("/logout", indexController.logout_get);

module.exports = router;
