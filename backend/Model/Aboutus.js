const mongoose = require("mongoose");


const AboutusSchema= mongoose.Schema({
    imgurl: String,
    headtext: String,
    bodytext: String,

})
const AboutUs = mongoose.model( "Aboutusdata", AboutusSchema);

module.exports = AboutUs;