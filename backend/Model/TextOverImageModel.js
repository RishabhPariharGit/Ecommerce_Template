const mongoose = require("mongoose");


const TextoverImageSchema= mongoose.Schema({
    Heading:String,
    Subhead:String,
    Imgurl:String
})
const TextoverImage = mongoose.model( "TextOverImage", TextoverImageSchema);

module.exports = TextoverImage;