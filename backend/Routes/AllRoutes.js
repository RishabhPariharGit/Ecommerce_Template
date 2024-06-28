const express = require("express");
const router = express.Router();

const {RegisterUser,LoginUser,UserDetails}=require('../Services/UserServices');
const {getBannerImgae,postBannerImage} = require('../controllers/BannerImageController')
const {getPlansData, postPlansData} = require ('../controllers/PlansController');
const {postAboutusData, getAboutusData,updateaboutus} = require ('../controllers/AboutCompanyController');
const {postTestimonialsData,getTestimonialsData,updatetestimonial} = require('../controllers/TestimonialController');
const {postProductDetails, getProductDetails,updateproductdetails} = require ('../controllers/ProductCardController')
  router.post("/RegisterUser", RegisterUser);
  router.post("/LoginUser", LoginUser);
  router.get("/UserDetails ", UserDetails);

  router.get("/bannerimages", getBannerImgae);
  router.post("/postimage",  postBannerImage);

  router.post("/plans", postPlansData);
  router.get("/plans", getPlansData);

  router.post("/aboutus", postAboutusData);
  router.get("/aboutus", getAboutusData);
  router.put("/aboutus/:id",updateaboutus);

  router.post("/testimonials", postTestimonialsData);
  router.get("/testimonials", getTestimonialsData);
  router.put('/testimonials/:id', updatetestimonial);

  router.post("/productcard", postProductDetails);
  router.get("/productcard", getProductDetails);
  router.put("/updateproductdetail/:id",updateproductdetails)
  
  module.exports = router;