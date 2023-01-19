const Comments = require("../models/comment");
const Post = require("../models/post");
const commentMailer = require("../mailer/newCommentMailer");
//

module.exports.create = async function (req, res) {
  try {
    let post = await Post.findById(req.body.post);
    if (post) {
      let comment = await Comments.create({
        content: req.body.content,
        post: req.body.post,
        user: req.user._id,
        email: req.user.email,
      });

      post.comments.push(comment);
      post.save();

      //for the mailer
      let newcomments = await comment.populate("user", "name email");

      // console.log("from Controller__", newcomments);
      commentMailer.newComment(newcomments);

      //ajax request check
      if (req.xhr) {
        return res.status(200).json({
          data: {
            comment: comment,
          },
          message: "Comment Created !",
        });
      }
      req.flash("success", "Your Comment Has Been Added !");
      res.redirect("/");
    }
  } catch (err) {
    req.flash("error", err);
    return res.redirect("back");
  }
};

//deleting the comment
module.exports.destroy = async function (req, res) {
  try {
    let id = req.params.id;
    console.log("From destroy ", id);
    let comment = await Comments.findById(id);
    if (comment.user == req.user.id) {
      let postId = comment.post;
      comment.remove();

      let post = await Post.findByIdAndUpdate(postId, {
        $pull: { comment: id },
      });
      if (req.xhr) {
        return res.status(200).json({
          data: {
            comment_id: id,
          },
          message: "comment get deleted !",
        });
      }

      return res.redirect("back");
    } else {
      return res.redirect("back");
    }
  } catch (error) {
    req.flash("error", error);
    return res.redirect("back");
  }
};
