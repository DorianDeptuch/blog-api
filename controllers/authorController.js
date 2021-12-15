// const { body, validationResult } = require("express-validator");
const passport = require("passport");
const Author = require("../models/author");
const LocalStrategy = require("passport-local").Strategy;
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
require("../config/passport");

exports.author_login_get = (req, res, next) => {};

exports.author_login_post = (req, res, next) => {
  passport.authenticate("local", { session: false }, (err, user, info) => {
    if (err || !user) {
      console.log(err, user);
      return res.status(400).json({
        message: "Something is not right",
        user: user,
      });
    }

    req.login(user, { session: false }, (err) => {
      if (err) {
        res.send(err);
      }

      // generate a signed son web token with the contents of user object and return it in the response

      const token = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: "24h",
      });
      console.log(token);
      // console.log(user); same as below
      console.log(req.user);
      req.token = token;

      req.headers["authorization"] = "bearer " + token;

      res.setHeader("Authorization", `Bearer ${token}`);
      // return res.json({ user, token });
      // next();
      global.token = token;
      global.user = user;
      res.redirect("/admin");
      // res.json({ user, token });
    });
  })(req, res, next);

  // Author.findOne().exec(async function (err, authorData) {
  //   if (err) {
  //     return next(err);
  //   }
  //   const { author, password } = authorData;
  //   const { inputUsername, inputPassword } = req.body;
  //   const valid = await bcrypt.compare(inputPassword, password);
  //   // .then((res) => console.log(res));

  //   if (!valid) {
  //     // throw new Error('Password is incorrect')
  //     console.log("Password is incorrect");
  //     res.redirect("/login");
  //   } else {
  //     // res.send("something went wrong");
  //     jwt.sign(
  //       { authorData },
  //       process.env.ACCESS_TOKEN_SECRET,
  //       { expiresIn: "15m" },
  //       (err, token) => {
  //         res.cookie("token", token, {
  //           secure: true,
  //           httpOnly: true,
  //           expires: new Date(Date.now() + 72 * 3600000),
  //         });
  //         console.log(token);
  //         res.redirect("/admin");
  //       }
  //     );
  //   }
  // });
};
// exports.author_login_post = (req, res, next) => {
//   Author.findOne().exec(async function (err, authorData) {
//     if (err) {
//       return next(err);
//     }
//     const { author, password } = authorData;
//     const { inputUsername, inputPassword } = req.body;
//     const valid = await bcrypt.compare(inputPassword, password);
//     // .then((res) => console.log(res));

//     if (!valid) {
//       // throw new Error('Password is incorrect')
//       console.log("Password is incorrect");
//       res.redirect("/login");
//     } else {
//       // res.send("something went wrong");
//       jwt.sign(
//         { authorData },
//         process.env.ACCESS_TOKEN_SECRET,
//         { expiresIn: "15m" },
//         (err, token) => {
//           res.cookie("token", token, {
//             secure: true,
//             httpOnly: true,
//             expires: new Date(Date.now() + 72 * 3600000),
//           });
//           console.log(token);
//           res.redirect("/admin");
//         }
//       );
//     }
//   });
// };

exports.author_logout_get = (req, res, next) => {
  global.token = "";
  global.user = "";
  req.logout();
  res.redirect("/login");
};

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

// function setLocalStorage(responseObj) {
//   localStorage.setItem("token", responseObj);
// }

// function logout() {
//   localStorage.removeItem("token");
// }

//TOKEN:
//eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZG1pbiI6eyJhdXRob3IiOiJEb3IiLCJwYXNzd29yZCI6IiQyYSQxMCRQci4ydlFVVW1wVEFVc3RuV01sNlRlSmpQaWt0ZTZLU3FTYmVwSUp1RldGT2ljWEM1c0F1LiJ9LCJpYXQiOjE2Mzg0MDExNDEsImV4cCI6MTYzODQwMTE3MX0.OTeUSd6hdArHH1PyZgklJ38_j0ZYfhrL0pWpgehusCY
