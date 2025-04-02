const express = require("express");
const router = express.Router();


const { GetAll_Active_Announcements
   } = require("../controllers/AnnouncementController");
const { GetAll_Active_Categories } = require("../controllers/CategoryController");



router.get("/GetAllActiveAnnouncement", GetAll_Active_Announcements);


router.get("/GetAllActiveCategory", GetAll_Active_Categories);

module.exports = router;