const mongoose = require("mongoose");
//multer using for file uploads.
const multer = require("multer");
const path = require("path");
const AVATAR_PATH = path.join("/upload/users/avatars");

//
const UserSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      require: true,
      unique: true,
    },
    password: {
      type: String,
      require: true,
    },
    name: {
      type: String,
      require: true,
    },
    avatar: {
      type: String,
    },
    token: {
      type: String,
      default: " ",
    },
    friendships: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "FriendShip",
      },
    ],
  },
  {
    timestamps: true,
  }
);

//define the storage function..
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "..", AVATAR_PATH));
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + "-" + uniqueSuffix);
  },
});

// static function
UserSchema.statics.uploadedAvatar = multer({ storage: storage }).single(
  "avatar"
);
UserSchema.statics.avatarPath = AVATAR_PATH;

const User = mongoose.model("User", UserSchema);

module.exports = User;
