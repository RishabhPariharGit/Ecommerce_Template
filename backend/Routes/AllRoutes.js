const express = require("express");
const router = express.Router();

const {RegisterUser,LoginUser,UserDetails}=require('../Controllers/UserController');
const { CreateCategory } = require("../Controllers/CategoryController");
const {GetAllCategories}= require("../Controllers/CategoryController");
const { CreateSubcategory, GetAllSubCategories, GetAllSubCategoriesByCategoryId } = require("../Controllers/SubCategoryController");
const { CreateProduct } = require("../Controllers/ProductController");


  router.post("/RegisterUser", RegisterUser);
  router.post("/LoginUser", LoginUser);
  router.get("/UserDetails ", UserDetails);

  router.post("/CreateCategory",CreateCategory)
  router.post("/CreateSubCategory",CreateSubcategory)
  router.post("/CreateProduct",CreateProduct)

  router.get("/GetAllCategory",GetAllCategories)
  router.post("/AllSubCategoriesByCategoryId",GetAllSubCategoriesByCategoryId)












  
  module.exports = router;