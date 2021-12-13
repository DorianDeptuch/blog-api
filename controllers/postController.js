const { body, validationResult } = require("express-validator");
const db = process.env.MONGO_URI;
const Post = require("../models/post");
const UserComment = require("../models/userComment");
const { format } = require("date-fns");
const async = require("async");

exports.blogpost_get = (req, res, next) => {
  Post.find({}, "title date image author")
    .sort({ date: "desc" })
    .exec(function (err, list_of_posts) {
      if (err) {
        return next(err);
      }
      res.json({ post_list: list_of_posts });
    });
};

// I DONT THINK THIS IS NEEDED ANYMORE
// exports.blogpost_post = (req, res, next) => {

//   //ADD VALIDATION AND MULTER
//   const newPost = new Post({
//     title: req.body.title,
//     content: req.body.content,
//     date: req.body.date,
//     published: false,
//     image: req.body.image,
//     author: req.body.author,
//     comments: req.body.comments,
//     dateFormatted: req.body.dateFormatted,
//   });

//   newPost.save();
//   res.json(newPost);
// };

exports.blogpost_put = (req, res, next) => {
  res.send("blog posts put");
};

exports.blogpost_delete = (req, res, next) => {
  res.send("blog posts delete");
};

exports.blogpost_detail_get = (req, res, next) => {
  Post.findById(req.params.id)
    .populate("title")
    .exec(function (err, results) {
      if (err) {
        return next(err);
      }
      const {
        title,
        content,
        date,
        published,
        image,
        author,
        dateFormatted,
        id,
      } = results;
      UserComment.find({ postid: req.params.id })
        .populate("username")
        .populate("message")
        .populate("date")
        .exec(function (err, commentResults) {
          if (err) {
            return next(err);
          }
          res.json({
            results,
            comments: commentResults,
          });
        });
    });
};

exports.blogpost_detail_post = [
  body("comment_user", "Please enter your name")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body("comment_content", "Please enter a message")
    .trim()
    .isLength({ min: 1 })
    .escape(),

  (req, res, next) => {
    const { comment_content, comment_user } = req.body;
    let errors = [];
    let validationErrors = validationResult(req);

    if (!comment_content || !comment_user) {
      errors.push({ msg: "Please fill in all fields" });
    }

    if (comment_content.length < 1 || comment_user.length < 1) {
      errors.push({
        msg: "Please enter a minimum of 1 character for all fields",
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
      const currentPost = Post.findById(req.params.id).exec(function (
        err,
        results
      ) {
        if (err) {
          return next(err);
        }
        //ADD VALIDATION
        const newComment = new UserComment({
          username: req.body.comment_user,
          message: req.body.comment_content,
          date: format(new Date(), "PPpp"),
          postid: req.params.id,
        });
        newComment.save();

        res.redirect("/posts/" + req.params.id);
      });
    }
  },
];
