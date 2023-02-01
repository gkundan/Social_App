const User = require("../models/user");
const Friend = require("../models/friendship");

//add friends..
module.exports.checkUser = async (req, res, next) => {
  try {
    const followerId = req.body.followerId;
    const followingId = req.body.followingId;
    const follower = await User.findById(followerId);
    if (!follower) {
      return res.status(400).send({ error: "Follower not found" });
    }
    const following = await User.findById(followingId);
    if (!following) {
      return res.status(400).send({ error: "Following not found" });
    }
    req.follower = follower;
    req.following = following;
    next();
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

exports.follow = async (req, res) => {
  try {
    const followerId = req.body.followerId;
    const followingId = req.body.followingId;
    const friendship = new Friend({
      from_user: followerId,
      to_user: followingId,
    });
    await friendship.save();
    req.follower.friendships.push(friendship._id);
    await req.follower.save();
    res.send({ message: "Followed successfully" });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

exports.unfollow = async (req, res) => {
  try {
    const followerId = req.body.followerId;
    const followingId = req.body.followingId;
    const friendship = await Friend.findOne({
      from_user: followerId,
      to_user: followingId,
    });
    await friendship.remove();
    req.follower.friendships.pull(friendship._id);
    await req.follower.save();
    res.send({ message: "Unfollowed successfully" });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};
