const express = require("express");
const router = express.Router();

const passwordController = require("../controller/password_Controller");

///
router.get("/", passwordController.getMail);
///submit mail
router.post("/forget-mail", passwordController.forgetPassword);
//reset password
router.get("/reset-password/:id/:token", passwordController.resetPassword);
router.post("/reset-password", passwordController.updatePassword);
//
///
module.exports = router;
