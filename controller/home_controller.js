//create a controller and send on route ans use as request route..
const Post = require("../models/post");
const User = require("../models/user");

//actions to show posts.
module.exports.home = async function (req, res) {
  //--- the populate in mongoose use to be a reference to same db for different collection

  try {
    let posts = await Post.find({})
      //sort the posts
      .sort("-createdAt")
      //finding the user
      .populate("user")
      //finding the comments of the same post from all users
      .populate({
        path: "comments",
        populate: {
          path: "user",
        },
      });

    //getting all user
    let users = await User.find({});

    //getting current
    if (req.isAuthenticated()) {
      const currentUserId = req.user._id;
      const currentUser = await User.findById(currentUserId).populate(
        "friendships.to_user"
      );

      console.log("from home controller", currentUser);
    } else {
      console.log("not found");
    }

    return res.render("home", {
      title: "Codeial | Home",
      posts: posts,
      all_user: users,
      friends: currentUser,
    });
  } catch (error) {
    console.log("Error ", error);
    return;
  }
};
