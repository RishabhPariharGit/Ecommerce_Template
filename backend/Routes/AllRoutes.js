const express = require("express");
const router = express.Router();

const {
  RegisterUser,
  LoginUser,
  GetUserByUsername,
  GetAllUsers,
  UpdateUser,
  DeleteUser,
  GetUserProfile
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
  DeleteProduct,
  GetAllProductsBySlug
} = require("../Controllers/ProductController");

const {AddToCart,AddToWishlist,GetCartItems}= require("../Controllers/CartItemController")
// User Ruote
router.post("/RegisterUser", RegisterUser);
router.post("/LoginUser", LoginUser);
router.get("/User/Edit/:Username", GetUserByUsername);
router.get("/GetAllUsers", GetAllUsers);
router.put("/UpdateUser/:Username", UpdateUser);
router.delete('/DeleteUser/:id', DeleteUser);
router.get('/UserProfile', GetUserProfile);


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
router.get("/AllProducts/:slug", GetAllProductsBySlug);


// Asdd To cart

router.post('/AddToCart', AddToCart);
router.post('/AddToWishlist', AddToWishlist);
router.get("/GetCartItems", GetCartItems);



module.exports = router;
