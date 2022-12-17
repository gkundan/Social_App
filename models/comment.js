const mongoose = require("mongoose");

//Schema for Comments
const commentsSchema = new mongoose.Schema(
  {
    content: {
      type: String,
      require: true,
    },
    //comment belong to a user an the post.
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    post: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post",
    },
  },
  { timestamps: true }
);

const Comments = mongoose.model("Comment", commentsSchema);
module.exports = Comments;
