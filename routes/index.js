const express = require("express");

const router = express.Router();

//controller... ******
const homeController = require("../controller/home_contoller");

//routing
router.get("/", homeController.home);
console.log("Hello I'm Routinnng...");

//
module.exports = router;
