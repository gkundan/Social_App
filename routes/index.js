const express = require("express");

const router = express.Router();

//controller... ******
const homeController = require("../controller/home_contoller");

//routing

console.log("Hello I'm Routinnng...");

//all primary req sent to this routes
router.get("/", homeController.home);

//all the user profile req sent to this routes
router.use("/users", require("./userRoute"));
//all the user posts req sent to this routes
router.use("/users", require("./postRoutes"));

//
module.exports = router;
