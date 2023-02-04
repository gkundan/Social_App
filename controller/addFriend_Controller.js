const mongoose = require("mongoose");
const User = require("../models/user");
const Friend = require("../models/friendship");
//

//
module.exports.follow = async (req, res) => {
  // console.log("from add friend controller", req.body);
  ///
  try {
    const followerId = mongoose.Types.ObjectId(req.body.followerId)
      .toString()
      .trim();
    const followingId = mongoose.Types.ObjectId(req.body.followingId)
      .toString()
      .trim();
    // Check if the followerId and followingId values are valid ObjectId values
    if (
      !mongoose.Types.ObjectId.isValid(followerId) ||
      !mongoose.Types.ObjectId.isValid(followingId)
    ) {
      return res.status(400).send({ error: "Invalid ObjectId value" });
    }

    //check the user id already in the database
    const existingFriendship = await Friend.findOne({
      followerId,
      followingId,
    });
    if (existingFriendship) {
      console.log("ALready Friends");
      return res.status(400).send({ error: "Friend is already followed!" });
    }
    //create new friendship
    const friendship = new Friend({
      from_user: followerId,
      to_user: followingId,
    });
    await friendship.save();
    console.log("friendship ", friendship);
    //update the user friendship array
    const user = await User.findById(followerId);
    user.friendships.push(friendship._id);
    await user.save();
    console.log("user form add friend controler", user);
    //return the updated follower count
    const followerCount = await User.countDocuments({
      friendships: friendship,
    });

    return res.status(200).send({ followerCount });
  } catch (error) {
    console.log("Error from controller", error);
    return res.status(500).send({ error: error.message });
  }
};
