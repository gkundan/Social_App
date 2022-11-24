const express = require("express");
const router = express.Router();

//get the post controller.
const postController = require("../controller/post_Controller");
router.get("/posts", postController.userPosts);

module.exports = router;
