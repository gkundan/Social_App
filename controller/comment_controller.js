const Comments = require("../models/comment");
const Post = require("../models/post");
//

module.exports.create = async function (req, res) {
  try {
    let post = await Post.findById(req.body.post);
    if (post) {
      let comment = await Comments.create({
        content: req.body.content,
        post: req.body.post,
        user: req.user._id,
      });
      // handle error

      post.comments.push(comment);
      post.save();

      res.redirect("/");
    }
  } catch (err) {
    console.log("Error :", err);
  }
};

//deleting the comment
module.exports.destroy = function (req, res) {
  let id = req.params.id;
  // console.log(id);
  Comments.findById(id, function (err, comment) {
    if (comment.user == req.user.id) {
      let postId = comment.post;
      comment.remove();

      Post.findByIdAndUpdate(
        postId,
        { $pull: { comments: req.params.id } },
        function (err, post) {
          return res.redirect("back");
        }
      );
    } else {
      return res.redirect("back");
    }
  });
};
