const express = require("express");
const router = express.Router();
const passport = require("passport");

//get the user controller..
const userController = require("../controller/userController");

//route the users
router.get(
  "/profile/:id",
  passport.checkAuthentication,
  userController.profile
);

//

//route for signUp
router.get("/sign-up", userController.signUp);

//router for signIN...
router.get("/sign-in", userController.signIn);

//router for signOut
router.get("/sign-out", userController.destroySession);
module.exports = router;

///

/// user update..
router.post("/update/:id", passport.checkAuthentication, userController.update);

//creating user
router.post("/create", userController.create);

//use passport as a middleware for authenticate
router.post(
  "/create-session",
  passport.authenticate("local", { failureRedirect: "/users/sign-in" }),
  userController.createSession
);
