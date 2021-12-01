var express = require("express");
var router = express.Router();
const indexController = require("../controllers/indexController");
const authorController = require("../controllers/authorController");

/* GET home page. */
router.get("/", indexController.index_get);

router.get("/api", indexController.api_get);

router.get("/admin", indexController.admin_get);

router.get("/about", indexController.about_get);

router.get("/contact", indexController.contact_get);

router.get("/login", authorController.author_login_get);

router.post("/login", authorController.author_login_post);

router.get("/logout", authorController.author_logout_get);

module.exports = router;
