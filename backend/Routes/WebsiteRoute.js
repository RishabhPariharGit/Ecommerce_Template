const express = require("express");
const router = express.Router();


const { GetAll_Active_Announcements
   } = require("../controllers/AnnouncementController");

const { GetAll_Active_Categories } = require("../controllers/CategoryController");

const { GetAll_Active_ImageSliders } = require("../controllers/ImageSliderController");

const { GetAllProductsBySlug ,
  GetAll_Active_Product,
  GetProductBySlug,
  GetAllProductsByGender} = require("../Controllers/ProductController");

const {
   GetAllSubCategoriesByCategoryId,
   GetAll_Active_subCategories,
   GetAllSubCategoriesByCategorySlug
 } = require("../Controllers/SubCategoryController");

const {
  RegisterUser,
  LoginUser 
} = require('../Controllers/UserController');

const {AddToCart,
  GetCartItems,
  DeleteCartItem,
  MergeCartItems}= require("../Controllers/CartItemController")

//Uer Route
router.post("/RegisterUser", RegisterUser);
router.post("/LoginUser", LoginUser);

//Announcement Route
router.get("/GetAllActiveAnnouncement", GetAll_Active_Announcements);


//Category Route
router.get("/GetAllActiveCategory", GetAll_Active_Categories);

//ImageSlider Route
router.get("/GetAllActiveImageSlider", GetAll_Active_ImageSliders);

//Product Route
router.post("/AllProducts/:slug", GetAllProductsBySlug);
router.get("/GetAllActiveProduct", GetAll_Active_Product);
router.get("/Product/Edit/:Slug", GetProductBySlug);
router.post("/AllProducts_By_Gender/:Gender", GetAllProductsByGender);

//SubCategory Route
router.post("/AllSubCategoriesByCategoryId", GetAllSubCategoriesByCategoryId);
router.post("/AllSubCategoriesByCategorySlug", GetAllSubCategoriesByCategorySlug);
router.get("/GetAllActiveSubCategory", GetAll_Active_subCategories);


// Add To cart
router.post('/AddToCart', AddToCart);
router.get("/GetCartItems", GetCartItems);
router.delete('/removeCartItem/:id', DeleteCartItem);
router.post('/mergeCartItems', MergeCartItems);

module.exports = router;