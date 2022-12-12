const passport = require("passport");

const LocalStrategy = require("passport-local").Strategy;
const User = require("../models/user");

//auth using passport and the local strategy.
passport.use(
  new LocalStrategy(
    //define the username field .
    {
      usernameField: "email",
    },
    function (email, password, done) {
      // find user and establish the identity..
      User.findOne({ email: email }, function (err, user) {
        if (err) {
          console.log("Error in finding user --> passport.");
          return done(err);
        }
        if (!user || user.password != password) {
          console.log("Invalid Username/Password");
          return done(null, false);
        }
        return done(null, user);
      });
    }
  )
);

// serialize the user to decided which key is to kept in cookies.
passport.serializeUser(function (user, done) {
  done(null, user.id);
});

//deserialize the user from the key in the cookies
passport.deserializeUser(function (id, done) {
  User.findById(id, function (err, user) {
    if (err) {
      console.log("Error in finding user --> passport.");
      return done(err);
    }
    return done(null, user);
  });
});

////***  check if user is auth then he can access the profile page */
passport.checkAuthentication = function (req, res, next) {
  //if the user is signed in then the pass on the request to the next function(controller action.)
  if (req.isAuthenticated()) {
    return next();
  }
  //if the user is not signIn.
  return res.redirect("/users/sign-in");
};

passport.setAuthenticatedUser = function (req, res, next) {
  if (req.isAuthenticated()) {
    //* req.user contain the current signed in user from the session cookies and we are just,
    // sending to the local for the views.   /
    res.locals.user = req.user;
  }
  next();
};

module.exports = passport;
