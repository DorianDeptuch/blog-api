const Post = require("../models/post");
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
      res.render("index", {
        title: "Home",
        message: false,
        post_list: list_of_posts,
        image,
      });
    });
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
  // let { formatRelative, format, subDays, formatDistance } = datefns;
  // let date = new Date();
  // // let fns = formatRelative(1535397423238, date); //today ay 10:03pm, 10/21/2018
  // // let fns = formatDistance(1535397423238, date, { //less than a minute ago, about 3 years ago
  // //   addSuffix: true,
  // // });
  // let fns = format(date, "PPpp");

  // console.log(date);
  // console.log(fns);
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
