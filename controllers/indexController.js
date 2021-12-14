const Post = require("../models/post");
const jwt = require("jsonwebtoken");
// const Author = require("../models/author");
// const datefns = require("date-fns");
const { body, validationResult } = require("express-validator");
const passport = require("passport");

exports.index_get = (req, res, next) => {
  Post.find({}, "title date image author")
    .limit(3)
    .sort({ date: "desc" })
    .exec(function (err, list_of_posts) {
      if (err) {
        return next(err);
      }
      res.json({
        post_list: list_of_posts,
      });
    });
};

// exports.admin_get = (req, res, next) => {
//   jwt.verify(req.token, process.env.ACCESS_TOKEN_SECRET, (err, authData) => {
//     if (err) {
//       res.sendStatus(403);
//     } else {
//       Post.find({}, "title date image author")
//         .limit(3)
//         .sort({ date: "desc" })
//         .exec(function (err, list_of_posts) {
//           const { image } = list_of_posts;
//           if (err) {
//             return next(err);
//           }
//           res.json({
//             post_list: list_of_posts,
//             authData,
//             user: req.user,
//           });
//         });
//     }
//   });
// };

exports.admin_get = (req, res, next) => {
  console.log(req.user); // from jwtstrategy - stack overflow
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
        user: req.user,
      });
    });
};

exports.admin_post = [
  body("inputPostTitle", "Please enter a title")
    .trim()
    .isLength({ min: 6 })
    .escape(),
  body("inputPostImageURL", "Please enter a URL")
    .trim()
    .isLength({ min: 6 })
    .escape(),
  body("inputPostContent", "Please enter content into the field")
    .trim()
    .isLength({ min: 6 })
    .escape(),

  (req, res, next) => {
    const { inputPostTitle, inputPostImageURL, inputPostContent } = req.body;
    let errors = [];
    let validationErrors = validationResult(req);

    if (!inputPostTitle || !inputPostImageURL || !inputPostContent) {
      errors.push({ msg: "Please fill in all fields" });
    }

    if (
      inputPostTitle.length < 6 ||
      inputPostImageURL.length < 6 ||
      inputPostContent.length < 6
    ) {
      errors.push({
        msg: "Please enter a minimum of 6 characters for all fields",
      });
    }

    if (!validationErrors.isEmpty()) {
      errors.push({ msg: "Validation failed " });
    }

    if (errors.length > 0) {
      res.json({
        errors, // => fetch('/admin') in <NewPost /> and if there are errors, post them
      });
    } else {
      const newPost = new Post({
        title: inputPostTitle,
        image: inputPostImageURL,
        content: inputPostContent,
        author: "Dor",
      });
      newPost.save();
      res.redirect("/admin");
    }
  },
];

exports.api_get = (req, res, next) => {
  Post.find({}, "title date image author published")
    .limit(3)
    .sort({ date: "desc" })
    .exec(function (err, list_of_posts) {
      if (err) {
        return next(err);
      }
      res.json({
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
