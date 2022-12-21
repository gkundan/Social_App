const express = require("express");
const router = express.Router();
const passport = require("passport");

//
//get the post controller.
const postController = require("../controller/post_Controller");

//post creation if the user is sign in{passport will check}
router.post("/create", passport.checkAuthentication, postController.create);

//router for deleting the posts
router.get(
  "/destroy/:id",
  passport.checkAuthentication,
  postController.destroy
);

module.exports = router;
