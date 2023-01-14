const express = require("express");

const router = express.Router();

//finding the posts
router.use("/posts", require("./post"));
//finding the users
router.use("/users", require("./users"));

//
module.exports = router;
