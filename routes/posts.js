var express = require("express");
var router = express.Router();
const postController = require("../controllers/postController");

router.get("/", postController.blogpost_get);

router.post("/", postController.blogpost_post);

router.put("/", postController.blogpost_put);

router.delete("/", postController.blogpost_delete);

router.get("/:id", postController.blogpost_detail_get);

module.exports = router;
