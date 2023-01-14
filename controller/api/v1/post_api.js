//getting model schemas
const Post = require("../../../models/post");
const Comment = require("../../../models/comment");

//fetch all the Posts comment and the user
module.exports.index = async function (req, res) {
  let posts = await Post.find({})
    .sort("-createdAt")
    .populate("user")
    .populate({
      path: "comments",
      populate: {
        path: "user",
      },
    });

  return res.json(200, {
    message: "List of posts",
    posts: posts,
  });
};

///delete post and the comment.
module.exports.destroy = async function (req, res) {
  console.log("api destroy", req.params.id);
  try {
    let post = await Post.findById(req.params.id);

    if (post.user == req.user.id) {
      post.remove();

      await Comment.deleteMany({ post: req.params.id });

      return res.json(200, {
        message: "Post and associated comments deleted successfully!",
      });
    } else {
      return res.json(401, {
        message: "You cannot delete this post!",
      });
    }
  } catch (err) {
    console.log("********", err);
    return res.json(500, {
      message: "Internal Server Error",
    });
  }
};
