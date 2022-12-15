const express = require("express");
const router = express.Router();

//get the post controller.
const postController = require("../controller/post_Controller");
//post creation
router.post("/create", postController.create);
module.exports = router;
