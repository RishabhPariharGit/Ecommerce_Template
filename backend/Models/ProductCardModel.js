const mongoose = require("mongoose");


const ProductCardSchema= mongoose.Schema({
    Arrival:String,
    Image:String,
    Tag:String,
    Productname:String,
    ProductInfo:String,
    MaximumRP:String,
    Sellingprice:String
})
const ProductCard = mongoose.model( "Productcard", ProductCardSchema);

module.exports = ProductCard;