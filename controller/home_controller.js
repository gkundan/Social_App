//create a controller and send on route ans use as request route..
const Post = require("../models/post");

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
    .populate("user")
    .exec(function (err, posts) {
      return res.render("home", {
        title: "Codeial | Home",
        posts: posts,
      });
    });
};
