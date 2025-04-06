const express = require("express");
const router = express.Router();


const { GetAll_Active_Announcements
   } = require("../controllers/AnnouncementController");
const { GetAll_Active_Categories } = require("../controllers/CategoryController");
const { GetAll_Active_ImageSliders } = require("../controllers/ImageSliderController");
const { GetAllProductsBySlug } = require("../Controllers/ProductController");
const {
   GetAllSubCategoriesByCategoryId,
   GetAll_Active_subCategories
 } = require("../Controllers/SubCategoryController");


router.get("/GetAllActiveAnnouncement", GetAll_Active_Announcements);


router.get("/GetAllActiveCategory", GetAll_Active_Categories);

router.get("/GetAllActiveImageSlider", GetAll_Active_ImageSliders);


router.get("/AllProducts/:slug", GetAllProductsBySlug);

router.post("/AllSubCategoriesByCategoryId", GetAllSubCategoriesByCategoryId);
router.get("/GetAllActiveSubCategory", GetAll_Active_subCategories);

module.exports = router;