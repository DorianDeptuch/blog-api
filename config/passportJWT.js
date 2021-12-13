const passport = require("passport");
const passportJWT = require("passport-jwt");
const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;
const Author = require("../models/author");

module.exports = (passport) => {
  passport.use(
    new JWTStrategy(
      {
        jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
        secretOrKey: process.env.ACCESS_TOKEN_SECRET,
        // passReqToCallback: true,
      },
      function (jwtPayload, cb) {
        // console.log("jwtpayload: ", jwtPayload);
        return Author.findById(jwtPayload._id)
          .then((user) => {
            // req.user = user;
            // console.log("user: ", user);
            return cb(null, user);
          })
          .catch((err) => {
            return cb(err);
          });
      }
    )
  );
};
