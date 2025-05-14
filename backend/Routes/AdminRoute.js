const express = require("express");
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const {
  GetUserByUsername,
  GetAllUsers,
  UpdateUser,
  DeleteUser,
  GetUserProfile,
  GetAddresses,
  AddAddress,
  UpdateUserAddress,
  DeleteUserAddress,
  UpdateDefaultAddress,
  AddUserAdmin,
  LoginUserAsAdmin
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






 const { CreatePage,
   GetAllPages, 
   GetPageBySlug,
   UpdatePage,
   DeletePage
 } = require("../controllers/PagesController");


 const { CreateAnnouncement,
  GetAllAnnouncements,
  GetAnnouncementById,
  UpdateAnnouncement,
  DeleteAnnouncement
 } = require("../controllers/AnnouncementController");


 const { CreateImageSlider,
  GetAllImageSliders,
  GetImageSliderById,
  UpdateImageSlider,
  DeleteImageSlider
 } = require("../controllers/ImageSliderController");

const { GetAllScrollingTexts, 
  CreateScrollingText,
   GetScrollingTextById, 
   UpdateScrollingText, 
   DeleteScrollingText
 } = require("../controllers/ScrollingTextController");

 const { GetAllScrollingVideos, 
  CreateScrollingVideo,
   GetScrollingVideoById, 
   UpdateScrollingVideo, 
   DeleteScrollingVideo
 } = require("../controllers/ScrollingVideoController");



const { GetAllUsps, 
  CreateUsps,
   GetUspsById, 
   UpdateUsps, 
   DeleteUsps
 } = require("../controllers/UspsController");


 const {
  GetAllPolicy, 
  CreatePolicy, 
  GetPolicyById, 
  UpdatePolicy,
  DeletePolicy} = require("../controllers/PolicyController");
 const {Createcollection,GetAllCollections,GetCollectionById,
  UpdateCollection,DeleteCollection} =require('../controllers/CollectionController')
// User Ruote

/*Login Route just before Auth because during login ther will be no token  */
router.post("/loginUseras_admin", LoginUserAsAdmin);


router.use(authMiddleware);
// User Ruote
router.post("/AddAdmin", AddUserAdmin);
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




//Pages Route
router.post("/CreatePage", CreatePage);
router.get("/GetAllPages", GetAllPages);
router.get("/Page/Edit/:Slug", GetPageBySlug);
router.put("/UpdatePage/:slug", UpdatePage);
router.delete('/DeletePage/:id', DeletePage);


//Annoouncement Route
router.post("/CreateAnnouncement", CreateAnnouncement);
router.get("/GetAllAnnouncement", GetAllAnnouncements);
router.get("/Announcement/Edit/:Id", GetAnnouncementById);
router.put("/UpdateAnnouncement/:Id", UpdateAnnouncement);
router.delete('/DeleteAnnouncement/:id', DeleteAnnouncement);


//ImageSlider Route
router.post("/CreateImageSlider", CreateImageSlider);
router.get("/GetAllImageSlider", GetAllImageSliders);
router.get("/ImageSlider/Edit/:Id", GetImageSliderById);
router.put("/UpdateImageSlider/:Id", UpdateImageSlider);
router.delete('/DeleteImageSlider/:id', DeleteImageSlider);



//ScrollingText Route
router.post("/CreateScrollingText", CreateScrollingText);
router.get("/GetAllScrollingText", GetAllScrollingTexts);
router.get("/ScrollingText/Edit/:Id", GetScrollingTextById);
router.put("/UpdateScrollingText/:Id", UpdateScrollingText);
router.delete('/DeleteScrollingText/:id', DeleteScrollingText);


//ScrollingVideo Route
router.post("/CreateScrollingVideo", CreateScrollingVideo);
router.get("/GetAllScrollingVideo", GetAllScrollingVideos);
router.get("/ScrollingVideo/Edit/:Id", GetScrollingVideoById);
router.put("/UpdateScrollingVideo/:Id", UpdateScrollingVideo);
router.delete('/DeleteScrollingVideo/:id', DeleteScrollingVideo);

//Usps Route
router.post("/CreateUsps", CreateUsps);
router.get("/GetAllUsps", GetAllUsps);
router.get("/Usps/Edit/:Id", GetUspsById);
router.put("/UpdateUsps/:Id", UpdateUsps);
router.delete('/DeleteUsps/:id', DeleteUsps);


// Colections route
router.post("/Createcollection", Createcollection);
router.get("/GetAllCollections", GetAllCollections);
router.get("/GetCollectionById/Edit/:Id", GetCollectionById);
router.put("/UpdateCollection/:Id", UpdateCollection);
router.delete('/DeleteCollection/:id', DeleteCollection);


//Policy Route
router.post("/CreatePolicy", CreatePolicy);
router.get("/GetAllPolicy", GetAllPolicy);
router.get("/Policy/Edit/:Id", GetPolicyById);
router.put("/UpdatePolicy/:Id", UpdatePolicy);
router.delete('/DeletePolicy/:id', DeletePolicy);



module.exports = router;
