const express = require("express");
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const {
  RegisterUser,
  LoginUser,
  GetUserByUsername,
  GetAllUsers,
  UpdateUser,
  DeleteUser,
  GetUserProfile,
  GetAddresses,
  AddAddress,
  UpdateUserAddress,
  DeleteUserAddress,
  UpdateDefaultAddress
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

const {AddToCart,
  GetCartItems,
  DeleteCartItem,
  MergeCartItems}= require("../Controllers/CartItemController")
const {AddToWishlist,
  GetWishListItems,
  DeleteWishlistItem}= require("../Controllers/WishListItemController");

const { AddSection,
  GetAllSections,
  GetSectionById,
  UpdateSection,
  DeleteSection,
  GetAllCollectionsforWebsite,
  SectionsAddToSidenav
 } = require("../controllers/HomepageSectionController");

 const { CreatePage, GetAllPages
 } = require("../controllers/PagesController");


// User Ruote
router.post("/RegisterUser", RegisterUser);
router.post("/LoginUser", LoginUser);
router.get("/User/Edit/:Username", GetUserByUsername);
router.get("/GetAllUsers", GetAllUsers);
router.put("/UpdateUser/:Username", UpdateUser);
router.delete('/DeleteUser/:id', DeleteUser);
router.get('/UserProfile',authMiddleware, GetUserProfile);

//User Address route
router.get('/User/addresses', authMiddleware,GetAddresses);
router.post('/User/address', authMiddleware, AddAddress);
router.put("/updateUserAddress/:editingAddressId",authMiddleware, UpdateUserAddress);
router.delete('/deleteUserAddress/:id',authMiddleware, DeleteUserAddress);
router.put("/addresses/default/:AddressId", UpdateDefaultAddress);


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


// Add To cart
router.post('/AddToCart', AddToCart);
router.get("/GetCartItems", GetCartItems);
router.delete('/removeCartItem/:id', DeleteCartItem);
router.post('/mergeCartItems', MergeCartItems);



//WishlistItem Route
router.post('/AddToWishlist', AddToWishlist);
router.get("/GetWishListItems", GetWishListItems);
router.delete('/removeWishListItem/:id', DeleteWishlistItem);

//HomePagesection Route
router.post("/AddSection", AddSection);
router.get("/GetAllSections", GetAllSections);
router.get("/HomePageSection/Edit/:id", GetSectionById);
router.put("/UpdateSection/:id", UpdateSection);
router.delete('/DeleteSection/:id', DeleteSection);
router.get("/GetAllsectionsforwebsite", GetAllCollectionsforWebsite);
router.put("/SectionsAddToSidenav", SectionsAddToSidenav);


//Pages Route
router.post("/CreatePage", CreatePage);
router.get("/GetAllPages", GetAllPages);

module.exports = router;
