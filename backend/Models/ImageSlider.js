const mongoose = require("mongoose");
const CommonFieldsSchema = require('./CommonFields');

const ImageSliderSchema = new mongoose.Schema({
  Image: String,
  Text: String,
  Link: String,
  Description: String,
  audit: CommonFieldsSchema
});

 const ImageSliderModel =mongoose.model("ImageSlider", ImageSliderSchema);
module.exports = ImageSliderModel;
