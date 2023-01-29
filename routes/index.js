const express = require("express");

const router = express.Router();

//controller... ******
const homeController = require("../controller/home_controller");

//routing

console.log("Hello I'm Routinizing...");

//all primary req sent to this routes
router.get("/", homeController.home);

//all the user specific req sent to this routes
router.use("/users", require("./userRoute"));
//all the user posts req sent to this routes
router.use("/posts", require("./postRoutes"));

//all the comment routes
router.use("/comments", require("./comment"));
//all like router
router.use("/likes", require("./like"));
//api router../
router.use("/api", require("./api"));

//forget password
router.use("/forget-password", require("./passwordRoute"));

module.exports = router;
