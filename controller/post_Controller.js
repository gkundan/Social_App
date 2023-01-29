const Post = require("../models/post");
const Comment = require("../models/comment");

//
module.exports.create = async function (req, res) {
  try {
    let post = await Post.create({
      content: req.body.content,
      user: req.user._id,
    });
    //check the if the req is an ajax req
    if (req.xhr) {
      return res.status(200).json({
        data: {
          post: post,
          user: req.user,
        },
        message: "Post Created!",
      });
    }

    req.flash("success", "Post Published !");
    return res.redirect("back");
  } catch (error) {
    req.flash("error", error);
    return res.redirect("back");
  }
};
//
//deleting the post..
module.exports.destroy = async function (req, res) {
  try {
    let id = req.params.id;
    id = id.trim();
    let post = await Post.findById(id);
    if (post.user == req.user.id) {
      // delete the associated likes for the post and all its comments' likes too
      await Like.deleteMany({ likeable: post, onModel: "Post" });
      await Like.deleteMany({ _id: { $in: post.comments } });
      post.remove();

      await Comment.deleteMany({ post: id });
      //for the ajax code.
      if (req.xhr) {
        return res.status(200).json({
          data: {
            post_id: id,
          },
          message: "Post and associated comment get deleted !",
        });
      }

      req.flash("success", "Post and associated comment get deleted !");
      return res.redirect("back");
    } else {
      req.flash("error", "You Can not delete Post !");
      return res.redirect("back");
    }
  } catch (err) {
    req.flash("error", err);
    return res.redirect("back");
  }
};
