const mongoose = require("mongoose");


const ImageSchema= mongoose.Schema({
    url: String,

})
const Bannerimage = mongoose.model( "BannerImage", ImageSchema);

module.exports = Bannerimage;