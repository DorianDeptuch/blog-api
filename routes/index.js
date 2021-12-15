var express = require("express");
var router = express.Router();
const passport = require("passport");
const indexController = require("../controllers/indexController");
const authorController = require("../controllers/authorController");
require("../config/passportJWT")(passport);
const verifyToken = require("../config/verifyToken");
const checkAuth = require("../config/checkAuth");
const auth = require("../config/auth");

/* GET home page. */
router.get("/", indexController.index_get);

router.get("/api", indexController.api_get);

router.get(
  "/admin",
  // verifyToken,
  auth,
  // checkAuth,
  // passport.authenticate("jwt", { session: false }),
  indexController.admin_get
);

router.post(
  "/admin",
  // verifyToken,
  // passport.authenticate("jwt", { session: false }),
  indexController.admin_post
);

router.get("/about", indexController.about_get);

router.get("/contact", indexController.contact_get);

router.get("/login", authorController.author_login_get);

router.post("/login", authorController.author_login_post);

router.get("/logout", authorController.author_logout_get);

// router.get(
//   "/protected",
//   passport.authenticate("jwt", { session: false }),
//   (req, res, next) => {
//     res.status(200).json({ success: true, msg: "You are authorized!" });
//   }
// );
function test(req, res, next) {
  const bearerHeader = req.headers["authorization"];
  if (typeof bearerHeader !== "undefined") {
    const bearer = bearerHeader.split(" ");
    const bearerToken = bearer[1];
    req.token = bearerToken;
    next();
  } else {
    console.log(typeof bearerHeader);
    res.sendStatus(403);
  }
  next();
}

module.exports = router;
