const Post = require("../models/post");
const Comment = require("../models/comment");

//
module.exports.create = async function (req, res) {
  try {
    await Post.create({
      content: req.body.content,
      user: req.user._id,
    });

    req.flash('success', 'Post Published !')
    return res.redirect("back");
  } catch (error) {
    req.flash('error', error)
    return res.redirect('back');
  }

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
      req.flash('success', 'Post and associated comment get deleted !')
      return res.redirect("back");
    } else {
      req.flash('error', 'You Can not delete Post !')
      return res.redirect("back");
    }
  } catch (err) {
    req.flash('error', err);
    return res.redirect('back');
  }
};
