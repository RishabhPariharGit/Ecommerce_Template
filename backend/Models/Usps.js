const mongoose = require("mongoose");
const CommonFieldsSchema = require('./CommonFields');

const UspsSchema = new mongoose.Schema({

  MainHeading: String,
  SubHeading: String,
  IconBlocks: [
    {
      icon_image: String,       // URL or image path for the icon
      title: String,      // Heading under the icon
      description: String // Subheading / description under the heading
    }
  ],
  audit: CommonFieldsSchema
});

 const UspsModel =mongoose.model("Usps", UspsSchema);
module.exports = UspsModel;
