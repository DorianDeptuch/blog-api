var express = require("express");
var router = express.Router();
const userCommentController = require("../controllers/userCommentController");

router.get("/post/:id/comment", userCommentController.user_comment_get);

router.post("/post/:id/comment", userCommentController.user_comment_post);
