////******    All the User Action Controller */

// profile render or userHome page
module.exports.profile = function (req, res) {
  return res.render("userprofile", {
    title: "UserProfile",
  });
};

///new sign Up action rendering ******/

module.exports.signUp = function (req, res) {
  return res.render("user_signUp", {
    title: "Codial/SignUp",
  });
};

//get the signup data
module.exports.create = function (req, res) {
  //later gator
};

////***  sign In Action rendering */

module.exports.signIn = function (req, res) {
  return res.render("user_sign_in", {
    title: "Codial/SignIn",
  });
};

//sign in session{session is like when the user sign Out is then there is no user }..
module.exports.createSession = function (req, res) {
  /// later gator
};
