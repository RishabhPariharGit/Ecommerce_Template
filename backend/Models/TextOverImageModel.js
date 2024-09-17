const mongoose = require("mongoose");


const TextoverImageSchema= mongoose.Schema({
    Mainhead:String,
    Heading:String,
    Subhead:String,
    Imgurl:String,
    Buttonone:String,
    linkone:String,
    Buttontwo:String,
    linktwo:String
})
const TextoverImage = mongoose.model( "TextOverImage", TextoverImageSchema);

module.exports = TextoverImage;