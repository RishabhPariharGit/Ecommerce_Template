const express = require("express");
const router = express.Router();
const {RegisterUser,LoginUser,UserDetails}=require('../Services/UserServices');
const {getBannerImgae,postBannerImage} = require('../controllers/maincontroller')

  router.post("/RegisterUser", RegisterUser);
  router.post("/LoginUser", LoginUser);
  router.get("/UserDetails ", UserDetails);
  router.get("/bannerimages", getBannerImgae);
  router.post("/postimage",  postBannerImage);


  module.exports = router;