const express = require("express");
const router = express.Router();

//get the user api from controller
const usersApi = require("../../../controller/api/v1/user_api");

//create session router for the jwt
router.post("/create-session", usersApi.createSession);

//
module.exports = router;
