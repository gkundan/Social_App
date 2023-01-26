const User = require("../models/user");


//deleting the previous file after the update
const fs = require("fs");
const path = require("path");
////******    All the User Action Controller */

// profile render or userHome page
module.exports.profile = function (req, res) {
  let id = req.params.id;
  User.findById(id, function (err, user) {
    return res.render("userProfile", {
      title: "User Profile",
      profile_user: user,
    });
  });
};
// **** profile update
module.exports.update = async function (req, res) {
  if (req.user.id == req.params.id) {
    try {
      let user = await User.findById(req.params.id);
      User.uploadedAvatar(req, res, function (err) {
        if (err) {
          console.log("__Multer Error__", err);
        }
        user.name = req.body.name;
        user.email = req.body.email;

        if (req.file) {
          //delete the previous file after uploaded new one.
          if (user.avatar) {
            fs.unlinkSync(path.join(__dirname, "..", user.avatar));
          }
          //this is saving the path of the uploaded file into the avatar filed in the user
          user.avatar = User.avatarPath + "/" + req.file.filename;
        }
        user.save();
        return res.redirect("back");
      });
    } catch (error) {
      console.log(error);
      req.flash("error", error);
      return res.redirect("back");
    }
  } else {
    return res.status(401).send("Unauthorized");
  }
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
  //show flash messages..
  req.flash("success", "Logged_In Successful");
  /// passport session..'
  return res.redirect("/");
};

//sign Out action
module.exports.destroySession = function (req, res) {
  req.logout(function (err) {
    //show flash messages
    req.flash("success", "You Have Logged Out!");
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
};
