// const { body, validationResult } = require("express-validator");
const db = process.env.MONGO_URI;
const Post = require("../models/post");

exports.blogpost_get = (req, res, next) => {
  res.render("posts");
};

exports.blogpost_post = (req, res, next) => {
  const newPost = new Post({
    title: "Hey",
    content: "Ya",
    date: "12-12-12",
    published: false,
  });

  newPost.save();
  // res.send("blog posts post");
  res.json(newPost);
};
exports.blogpost_put = (req, res, next) => {
  res.send("blog posts put");
};
exports.blogpost_delete = (req, res, next) => {
  res.send("blog posts delete");
};

exports.blogpost_detail_get = (req, res, next) => {
  res.render("postDetail", { title: req.params.id });
};
