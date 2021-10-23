var express = require("express");
var router = express.Router();
const indexController = require("../controllers/indexController");

/* GET home page. */
router.get("/", indexController.index_get);

// router.get("/hi", (req, res, next) => {
//   res.send("hi");
// });

module.exports = router;
