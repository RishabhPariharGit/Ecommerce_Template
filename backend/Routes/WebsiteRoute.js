const express = require("express");
const router = express.Router();


const { GetAll_Active_Announcements
   } = require("../controllers/AnnouncementController");

const { GetAll_Active_Categories } = require("../controllers/CategoryController");

const { GetAll_Active_ImageSliders } = require("../controllers/ImageSliderController");
const { GetAll_Active_ScrollingTexts } = require("../controllers/ScrollingTextController");
const { GetAll_Active_ScrollingVideos } = require("../controllers/ScrollingVideoController");
const { GetAll_Active_Usps } = require("../controllers/UspsController");
const { GetCollectionByName } = require("../controllers/CollectionController");


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
  LoginUser ,
  GetUserProfile,
  UpdateUser
} = require('../Controllers/UserController');

const {AddToCart,
  GetCartItems,
  DeleteCartItem,
  MergeCartItems,
  GetCartItemsCount}= require("../Controllers/CartItemController")


  const {AddToWishlist,
    GetWishListItems,
    DeleteWishlistItem,GetWishlistCount}= require("../Controllers/WishListItemController");

    const{GetPolicyBySlug}= require("../controllers/PolicyController")

//Uer Route
router.post("/RegisterUser", RegisterUser);
router.post("/LoginUser", LoginUser);
router.get('/UserProfile', GetUserProfile);
router.put("/UpdateUser/:Username", UpdateUser);

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
router.get("/GetCartItemsCount", GetCartItemsCount);
router.delete('/removeCartItem/:id', DeleteCartItem);
router.post('/mergeCartItems', MergeCartItems);



//WishlistItem Route
router.post('/AddToWishlist', AddToWishlist);
router.get("/GetWishListItems", GetWishListItems);
router.delete('/removeWishListItem/:id', DeleteWishlistItem);
router.get("/GetWishlistCount", GetWishlistCount);

//ScrollingText Route
router.get("/GetAllActiveScrollingText", GetAll_Active_ScrollingTexts);

//Usps Route
router.get("/GetAll_Active_Usps", GetAll_Active_Usps);

//ScrollingVideo Route
router.get("/GetAllActiveScrollingVideo", GetAll_Active_ScrollingVideos);

router.post("/GetColletionByname", GetCollectionByName);


router.post("/GetPolicyBySlug",GetPolicyBySlug)

module.exports = router;