const express = require("express");
const router = express.Router();


const { GetAll_Active_Announcements
   } = require("../controllers/AnnouncementController");
const { GetAll_Active_Categories } = require("../controllers/CategoryController");
const { GetAll_Active_ImageSliders } = require("../controllers/ImageSliderController");
const { GetAllProductsBySlug } = require("../Controllers/ProductController");



router.get("/GetAllActiveAnnouncement", GetAll_Active_Announcements);


router.get("/GetAllActiveCategory", GetAll_Active_Categories);

router.get("/GetAllActiveImageSlider", GetAll_Active_ImageSliders);


router.get("/AllProducts/:slug", GetAllProductsBySlug);

module.exports = router;