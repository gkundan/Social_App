const User = require("../models/user");
////******    All the User Action Controller */

// profile render or userHome page
module.exports.profile = function (req, res) {
  //first we'll see if any userId in cookies
  return res.render("userProfile", {
    title: "User Profile",
  });
};

///new sign Up action rendering ******/

module.exports.signUp = function (req, res) {
  //if user is already in cookies then send to profile
  if (req.isAuthenticated()) {
    return res.redirect("/users/profile");
  }
  return res.render("user_signUp", {
    title: "Codeial/SignUp",
  });
};

//get the signup data
module.exports.create = function (req, res) {
  //check the password are matched.
  if (req.body.password != req.body.confirm_password) {
    return res.redirect("back");
  }
  //check the email as the user should be logIn before.
  User.findOne({ email: req.body.email }, function (err, user) {
    if (err) {
      console.log("error in finding User in SignUp");
      return;
    }
    if (!user) {
      User.create(req.body, function (err, user) {
        if (err) {
          console.log("error in finding User in SignUp");
          return;
        }
        return res.redirect("/users/sign-in");
      });
    } else {
      return res.redirect("back");
    }
  });
};

////***  sign In Action rendering */

module.exports.signIn = function (req, res) {
  //if user is in cookies then send to profile
  if (req.isAuthenticated()) {
    return res.redirect("/users/profile");
  }
  return res.render("user_sign_in", {
    title: "Codial/SignIn",
  });
};

//sign in session{session is like when the user sign Out is then there is no user }..
module.exports.createSession = function (req, res) {
  /// passport session..'
  return res.redirect("/");
};

//sign Out action
module.exports.destroySession = function (req, res) {
  req.logout();

  return res.redirect("/");
};
