var express = require("express");
var router = express.Router();
const apiController = require("../controllers/apiController");

router.get("/api", apiController.test);

module.exports = router;
