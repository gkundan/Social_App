const express = require("express");

const router = express.Router();
const FriendsController = require("../controller/addFriend_Controller");

router.get("/follow", FriendsController.addFriends);

module.exports = router;
