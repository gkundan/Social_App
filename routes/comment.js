const express = require("express");
const router = express.Router();
const passport = require("passport");

//
//get the post controller.
const commentController = require("../controller/comment_controller");

//post creation if the user is sign in{passport will check}
router.post("/create", passport.checkAuthentication, commentController.create);

module.exports = router;
