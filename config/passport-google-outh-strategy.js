const passport = require("passport");
const googleStrategy = require("passport-google-oauth").OAuth2Strategy;
const crypto = require("crypto");
const User = require("../models/user");

//tell passport to use new strategy
passport.use(
  new googleStrategy(
    {
      clientID:
        "753693704989-9drjepb5hhvi7s0pvov6qfhvthuib08e.apps.googleusercontent.com",
      clientSecret: "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",
      callbackURL: "http://localhost:8000/users/auth/google/callback",
    },
    function (accessToken, refreshToken, profile, done) {
      //find the user
      User.findOne({ email: profile.emails[0].value }).exec(function (
        err,
        user
      ) {
        if (err) {
          console.log("Error in Google Strategy Passport", err);
          return;
        }
        console.log(profile);

        if (user) {
          //if found set this  user as req.user
          return done(null, user);
        } else {
          //if not found, create the user and set it as req.user
          User.create(
            {
              name: profile.displayName,
              email: profile.emails[0].value,
              password: crypto.randomBytes(20).toString("hex"),
            },
            function (err, user) {
              if (err) {
                console.log("Error in creating in user google strategy", err);
                return;
              }
              return done(null, user);
            }
          );
        }
      });
    }
  )
);

module.exports = passport;
