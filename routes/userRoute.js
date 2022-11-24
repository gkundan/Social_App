const express = require("express");
const router = express.Router();

//get the user controller..
const userController = require("../controller/userController");

//route the users
router.get("/profile", userController.profile);

module.exports = router;
