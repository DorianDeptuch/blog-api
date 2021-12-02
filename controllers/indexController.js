const Post = require("../models/post");
const jwt = require("jsonwebtoken");
// const Author = require("../models/author");
// const datefns = require("date-fns");

exports.index_get = (req, res, next) => {
  Post.find({}, "title date image author")
    .limit(3)
    .sort({ date: "desc" })
    .exec(function (err, list_of_posts) {
      const { image } = list_of_posts;
      if (err) {
        return next(err);
      }
      // res.render("index", {
      //   title: "Home",
      //   message: false,
      //   post_list: list_of_posts,
      //   image,
      // });
      res.json({
        post_list: list_of_posts,
      });
    });
};

exports.admin_get = (req, res, next) => {
  Post.find({}, "title date image author")
    .limit(3)
    .sort({ date: "desc" })
    .exec(function (err, list_of_posts) {
      const { image } = list_of_posts;
      if (err) {
        return next(err);
      }
      res.json({
        post_list: list_of_posts,
      });
      // Author.findOne().exec(async function (err, authorData) {
      //   if (err) {
      //     return next(err);
      //   }
      //   res.json({
      //     post_list: list_of_posts,
      //     authorData: authorData,
      //   });
      // });
      // res.render("index", {
      //   title: "Home",
      //   message: false,
      //   post_list: list_of_posts,
      //   image,
      // });
    });
};

exports.admin_post = (req, res, next) => {
  const { inputPostTitle, inputPostImageURL, inputPostContent } = req.body;

  const newPost = new Post({
    title: inputPostTitle,
    image: inputPostImageURL,
    content: inputPostContent,
    author: "Dor",
  });
  newPost.save();
  res.redirect("/admin");
};

exports.api_get = (req, res, next) => {
  Post.find({}, "title date image author published")
    .limit(3)
    .sort({ date: "desc" })
    .exec(function (err, list_of_posts) {
      if (err) {
        return next(err);
      }
      res.json({
        // title: "Home",
        // message: false,
        post_list: list_of_posts,
      });
    });
};

exports.about_get = (req, res, next) => {
  res.render("about", { title: "About" });
};

exports.contact_get = (req, res, next) => {
  res.render("contact", { title: "Contact" });
};

exports.signup_get = (req, res, next) => {
  res.render("signup", { title: "Signup" });
};

exports.signup_post = (req, res, next) => {
  res.render("signup", { title: "Signup" });
};

exports.login_get = (req, res, next) => {
  res.render("login", { title: "Login" });
};

exports.login_post = (req, res, next) => {
  res.render("login", { title: "Login" });
};

exports.logout_get = (req, res, next) => {
  res.redirect("/");
};

// function verifyToken(req, res, next) {
//   const bearerHeader = req.headers["authorization"];

//   if (typeof bearerHeader !== "undefined") {
//     const bearer = bearerHeader.split(" ");
//     const bearerToken = bearer[1];
//     req.token = bearerToken;
//     next();
//   } else {
//     res.sendStatus(403);
//   }
// }
