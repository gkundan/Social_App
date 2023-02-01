const mongoose = require("mongoose");

//friendship schema
const friendShipSchema = new mongoose.Schema(
  {
    //the user who add the user
    from_user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    // to the user who is been add as friend of the user
    to_user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

//
const friendship = mongoose.model("FriendShip", friendShipSchema);

module.exports = friendship;
