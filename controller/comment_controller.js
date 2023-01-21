const Comments = require("../models/comment");
const Post = require("../models/post");
const commentMailer = require("../mailer/newCommentMailer");
const queue = require("kue");
const commentEmailWorker = require("../workers/comment-email-worker");
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
      comment = await comment.populate("user", "name email");

      console.log("from Controller__", comment);
      // commentMailer.newComment(comment);

      /////kue worker
      let job = queue.create("emails", comment).save(function (err) {
        if (err) {
          console.log("Error in sending to Kue", err);
          return;
        }
        console.log("Job Enqueued", job.id);
      });

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
