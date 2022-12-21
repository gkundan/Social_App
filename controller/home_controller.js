//create a controller and send on route ans use as request route..
const Post = require("../models/post");
const User = require("../models/user");
//actions
module.exports.home = function (req, res) {
  // console.log(req.cookies);
  //**** simple way to find the posts */
  // Post.find({}, function (err, posts) {
  //   return res.render("home", {
  //     title: "Codeial| Home",
  //     posts: posts,
  //   });
  // });

  //--- the populate in mongoose
  Post.find({})
    //finding the user
    .populate("user")
    //finding the comments
    .populate({
      path: "comments",
      populate: {
        path: "user",
      },
    })
    .exec(function (err, posts) {
      User.find({}, function (err, users) {
        return res.render("home", {
          title: "Codeial | Home",
          posts: posts,
          all_user: users,
        });
      });
    });
};
