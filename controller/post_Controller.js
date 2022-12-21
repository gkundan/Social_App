const Post = require("../models/post");
const Comment = require("../models/comment");

//
module.exports.create = function (req, res) {
  Post.create(
    {
      content: req.body.content,
      user: req.user._id,
    },
    function (err, post) {
      if (err) {
        console.log("err to create post");
        return;
      }
      return res.redirect("back");
    }
  );
};
//
//deleting the post..
module.exports.destroy = function (req, res) {
  // console.log(req.params.id);
  let id = req.params.id;
  // id = id.trim();
  Post.findById(id, function (err, post) {
    //.id means converting the objectId into String
    if (post.user == req.user.id) {
      post.remove();

      Comment.deleteMany({ post: id }, function (err) {
        return res.redirect("back");
      });
    } else {
      console.log("Not Found Post");
      return res.redirect("back");
    }
  });
};
