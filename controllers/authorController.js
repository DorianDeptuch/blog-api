// const { body, validationResult } = require("express-validator");
const passport = require("passport");
const Author = require("../models/author");
const LocalStrategy = require("passport-local").Strategy;
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

exports.author_login_get = (req, res, next) => {};

exports.author_login_post = (req, res, next) => {
  Author.findOne().exec(async function (err, authorData) {
    if (err) {
      return next(err);
    }
    const { author, password } = authorData;
    const { inputUsername, inputPassword } = req.body;
    const valid = await bcrypt.compare(inputPassword, password);
    // .then((res) => console.log(res));

    if (!valid) {
      // throw new Error('Password is incorrect')
      console.log("Password is incorrect");
      res.redirect("/login");
    } else {
      // res.send("something went wrong");
      jwt.sign(
        { authorData },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: "15m" },
        (err, token) => {
          // res.json({
          //   token,
          // });
          console.log(token);
          res.redirect("/admin");
        }
      );
    }
  });
};

exports.author_logout_get = (req, res, next) => {};

// SIGNUP NEW AUTHOR INTO DB
//   const newAuthor = new Author({
//     author: "Dor",
//     password: "SuperSecretPassword",
//   });
//   bcrypt.genSalt(10, (err, salt) =>
//     bcrypt.hash(newAuthor.password, salt, (err, hash) => {
//       if (err) throw err;
//       newAuthor.password = hash;
//       newAuthor
//         .save()
//         .then((author) => {
//           // req.flash(
//           //   "success_msg",
//           //   "You are now Registered and can Log In"
//           // );
//           res.redirect("/admin");
//         })
//         .catch((err) => console.log(err));
//     })
//   );
//

//TOKEN:
//eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZG1pbiI6eyJhdXRob3IiOiJEb3IiLCJwYXNzd29yZCI6IiQyYSQxMCRQci4ydlFVVW1wVEFVc3RuV01sNlRlSmpQaWt0ZTZLU3FTYmVwSUp1RldGT2ljWEM1c0F1LiJ9LCJpYXQiOjE2Mzg0MDExNDEsImV4cCI6MTYzODQwMTE3MX0.OTeUSd6hdArHH1PyZgklJ38_j0ZYfhrL0pWpgehusCY
