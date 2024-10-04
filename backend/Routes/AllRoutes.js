const express = require("express");
const router = express.Router();

const {RegisterUser,LoginUser,UserDetails}=require('../controllers/UserController');
const { CreateCategory } = require("../controllers/CategoryController");
const {GetAllCategories}= require("../controllers/CategoryController");
const { CreateSubcategory, GetAllSubCategories, GetAllSubCategoriesByCategoryId } = require("../controllers/SubCategoryController");
const { CreateProduct } = require("../controllers/ProductController");


  router.post("/RegisterUser", RegisterUser);
  router.post("/LoginUser", LoginUser);
  router.get("/UserDetails ", UserDetails);

  router.post("/CreateCategory",CreateCategory)
  router.post("/CreateSubCategory",CreateSubcategory)
  router.post("/CreateProduct",CreateProduct)

  router.get("/GetAllCategory",GetAllCategories)
  router.post("/AllSubCategoriesByCategoryId",GetAllSubCategoriesByCategoryId)












  
  module.exports = router;