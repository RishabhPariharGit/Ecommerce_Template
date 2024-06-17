const express = require("express");
const router = express.Router();
const {RegisterUser,LoginUser,UserDetails}=require('../Services/UserServices');

  router.post("/RegisterUser", RegisterUser);
  router.post("/LoginUser", LoginUser);
  router.get("/UserDetails ", UserDetails);





  module.exports = router;