const express = require("express");
const router = express.Router();
const {RegisterUser,LoginUser,UserDetails}=require('../Services/UserServices');
const {getBannerImgae,postBannerImage,getPlansData, postPlansData,postAboutusData, getAboutusData,
  postTestimonialsData,getTestimonialsData
} = require('../controllers/maincontroller')

  router.post("/RegisterUser", RegisterUser);
  router.post("/LoginUser", LoginUser);
  router.get("/UserDetails ", UserDetails);
  router.get("/bannerimages", getBannerImgae);
  router.post("/postimage",  postBannerImage);
  router.post("/postplans", postPlansData);
  router.get("/plans", getPlansData);
  router.post("/aboutus", postAboutusData);
  router.get("/aboutus", getAboutusData);
  router.post("/testimonials", postTestimonialsData);
  // router.get("/aboutus", getAboutusData);


  module.exports = router;