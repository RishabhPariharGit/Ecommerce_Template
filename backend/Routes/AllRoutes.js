const express = require("express");
const router = express.Router();

const {
  RegisterUser,
  LoginUser,
  UserDetails
} = require('../Controllers/UserController');
const {
  CreateCategory,
  GetCategoryBySlug,
  GetAllCategories,
  UpdateCategory ,
  DeleteCategory
} = require("../Controllers/CategoryController");
const {
  CreateSubcategory,
  GetAllSubCategories,
  GetAllSubCategoriesByCategoryId,
  GetSubCategoryBySlug,
  UpdateSubCategory,
  DeleteSubCategory
} = require("../Controllers/SubCategoryController");
const {
  CreateProduct,
  GetAllProducts,
  GetProductBySlug,
  UpdateProduct,
  DeleteProduct
} = require("../Controllers/ProductController");

// User Ruote
router.post("/RegisterUser", RegisterUser);
router.post("/LoginUser", LoginUser);
router.get("/UserDetails", UserDetails);

//Category route
router.post("/CreateCategory", CreateCategory);
router.get("/GetAllCategory", GetAllCategories);
router.get("/Category/Edit/:Slug", GetCategoryBySlug);
router.put("/UpdateCategory/:slug", UpdateCategory);
router.delete('/DeleteCategory/:id', DeleteCategory);


// SubCategory route
router.post("/CreateSubCategory", CreateSubcategory);
router.get("/GetAllSubCategories", GetAllSubCategories);
router.get("/SubCategory/Edit/:Slug", GetSubCategoryBySlug);
router.post("/AllSubCategoriesByCategoryId", GetAllSubCategoriesByCategoryId);
router.put("/UpdateSubCategory/:slug", UpdateSubCategory);
router.delete('/DeleteSubCategory/:id', DeleteSubCategory);

// Product Route
router.post("/CreateProduct", CreateProduct);
router.get("/GetAllProducts", GetAllProducts);
router.get("/Product/Edit/:Slug", GetProductBySlug);
router.put("/UpdateProduct/:slug", UpdateProduct);
router.delete('/DeleteProduct/:id', DeleteProduct);






module.exports = router;
