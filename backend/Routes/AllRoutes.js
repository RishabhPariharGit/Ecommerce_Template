const express = require("express");
const router = express.Router();
const {RegisterUser,LoginUser}=require('../Services/UserServices');

  router.post("/RegisterUser", RegisterUser);
  router.post("/LoginUser", LoginUser);




  module.exports = router;