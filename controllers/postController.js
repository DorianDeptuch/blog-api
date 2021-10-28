// const { body, validationResult } = require("express-validator");
const db = process.env.MONGO_URI;
const Post = require("../models/post");
const { format } = require("date-fns");

exports.blogpost_get = (req, res, next) => {
  Post.find({}, "title date image author")
    .sort({ date: "desc" })
    .exec(function (err, list_of_posts) {
      const { image } = list_of_posts;
      if (err) {
        return next(err);
      }
      res.render("posts", { title: "posts", post_list: list_of_posts, image });
    });
};

exports.blogpost_post = (req, res, next) => {
  // const newPost = new Post({
  //   title: "How to hike",
  //   content:
  //     "Step 1.) Put one foot forward Step 2.) Put the other foot forward Step 3.) See step 1",
  //   date: "12-12-12",
  //   published: false,
  //   image:
  //     "https://images.pexels.com/photos/6465964/pexels-photo-6465964.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
  //   author: "Dor",
  //   comments: [
  //     {
  //       user: "Ryan",
  //       comment: "Whoa, I never realized how to do this!",
  //       date: "12-13-12",
  //     },
  //     {
  //       user: "Amy",
  //       comment: "Cool, thanks for the tips",
  //       date: "12-14-12",
  //     },
  //     {
  //       user: "Jimbo",
  //       comment: "I needed this, thank you",
  //       date: "12-15-12",
  //     },
  //     {
  //       user: "Tamara",
  //       comment: "Brb, going to try this.\n Edit: It works!!",
  //       date: "12-16-12",
  //     },
  //   ],
  // });
  const newPost = new Post({
    title: req.body.title,
    content: req.body.content,
    date: req.body.date,
    published: false,
    image: req.body.image,
    author: req.body.author,
    comments: req.body.comments,
    dateFormatted: req.body.dateFormatted,
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
  Post.findById(req.params.id)
    .populate("title")
    .exec(function (err, results) {
      const {
        title,
        content,
        date,
        published,
        image,
        author,
        comments,
        dateFormatted,
        id,
      } = results;
      if (err) {
        return next(err);
      }
      // console.log(results);
      res.render(
        "postDetail",
        // { title: req.params.id }
        {
          title,
          content,
          date,
          published,
          image,
          author,
          comments,
          dateFormatted,
          id,
        }
      );
    });
};

exports.blogpost_detail_put = (req, res, next) => {
  // const newComment = {
  //   user: req.body.comment_user,
  //   content: req.body.comment_content,
  //   date: format(new Date(), "PPpp"),
  // };

  req.post = new Post();
  let post = req.post;

  post.title = req.params.title;
  post.content = req.params.content;
  post.date = req.params.date;
  post.published = false;
  post.image = req.params.image;
  post.author = req.params.author;
  post.comments.user = req.body.comment_user;
  post.comments.content = req.body.comment_content;
  post.comments.date = format(new Date(), "PPpp");
  post.dateFormatted = req.params.dateFormatted;
  // post.id = req.params.id;

  // const updatedPost = new Post({
  //   title: req.params.title,
  //   content: req.params.content,
  //   date: req.params.date,
  //   published: false,
  //   image: req.params.image,
  //   author: req.params.author,
  //   comments: req.params.comments,
  //   dateFormatted: req.params.dateFormatted,
  //   _id: req.params.id,
  // });

  Post.findByIdAndUpdate(
    req.params.id,
    // updatedPost,
    req.post,
    {},
    function (err, updated) {
      if (err) {
        return next(err);
      }
      res.redirect(updated.url);
    }
  );
};
