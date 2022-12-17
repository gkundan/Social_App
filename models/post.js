const mongoose = require("mongoose");

//creating schema for posts.
const postSchema = new mongoose.Schema(
  {
    content: {
      type: String,
      require: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    //include the array of the ids of the all comments in the post Schema itself,
    comments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "comment",
      },
    ],
  },
  { timestamps: true }
);

//Mode.
const Post = mongoose.model("Post", postSchema);

module.exports = Post;
