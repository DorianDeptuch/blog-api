const Post = require("../models/post");
const UserComment = require("../models/userComment");
const { body, validationResult } = require("express-validator");

exports.user_comment_get = (req, res, next) => {};

exports.user_comment_post = (req, res, next) => {
  const newComment = new UserComment({
    username: req.body.comment_userename,
    message: req.body.comment_content,
    post: req.params.id,
    date: Date.now(),
  });

  newComment.save();
};
