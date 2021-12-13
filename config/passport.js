const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const passportJWT = require("passport-jwt");
const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;
const Author = require("../models/author");
const bcrypt = require("bcryptjs");

module.exports = (passport) => {
  passport.use(
    new LocalStrategy(
      {
        usernameField: "inputUsername",
        passwordField: "inputPassword",
      },
      function (username, password, cb) {
        Author.findOne().then(async (user) => {
          let hashedPassword = user.password;
          const valid = await bcrypt.compare(password, hashedPassword);
          if (valid) {
            return Author.findOne({ username })
              .then((user) => {
                if (!user) {
                  return cb(null, false, {
                    message: "Incorrect email or password.",
                  });
                } else {
                  return cb(
                    null,
                    { user },
                    { message: "Logged In Successfully" }
                  );
                }
              })
              .catch((err) => cb(err));
          } else {
            cb(null, false, { message: "Incorrect user or password" });
          }
        });
      }
    )

    // passport.use(
    //   new LocalStrategy(
    //     {
    //       usernameField: "inputUsername",
    //       passwordField: "inputPassword",
    //     },
    //     (username, password, done) => {
    //       Author.findOne()
    //         .then((user) => {
    //           if (!user) {
    //             return done(null, false, {
    //               message: "That User is not registered",
    //             });
    //           }
    //           bcrypt.compare(password, user.password, (err, isMatch) => {
    //             if (err) throw err;

    //             if (isMatch) {
    //               return done(null, user);
    //             } else done(null, false, { message: "Password is incorrect" });
    //           });
    //         })
    //         .catch((err) => console.log(err));
    //     }
    //   )
    // );
  );
};

// const options = {
//   jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken(),
//   secretOrKey = process.env.ACCESS_TOKEN_SECRET,
//   algorithms: ['RS256']
// }

// const strategy = new JwtStrategy(options, (payload, done) => {
//   Author.findOne({ _id: payload.sub})
//   .then(user => {
//     if (user) {
//       return done(null, user)
//     } else {
//       return done(null, false)
//     }
//   })
//   .catch(err => done(err, null))
// })

// module.exports = passport => {
//   passport.use(strategy)
// }
