const express = require("express");
const router = express.Router();

//get the user controller..
const userController = require("../controller/userController");

//route the users
router.get("/profile", userController.profile);
//route for signUp
router.get("/sign-up", userController.signUp);

//router for signIN...
router.get("/sign-in", userController.signIn);
module.exports = router;
