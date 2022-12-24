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
module.exports.destroy = async function (req, res) {
  console.log(req.params.id);
  try {
    let id = req.params.id;
    id = id.trim();
    let post = await Post.findById(id);

    //.id means converting the objectId into String

    if (post.user == req.user.id) {
      post.remove();

      await Comment.deleteMany({ post: id });
      return res.redirect("back");
    } else {
      console.log("Not Found Post");
      return res.redirect("back");
    }
  } catch (err) {
    console.log("Error : ", err);
  }
};
