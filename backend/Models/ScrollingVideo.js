const mongoose = require("mongoose");
const CommonFieldsSchema = require('./CommonFields');

const ScrollingVideoSchema = new mongoose.Schema({

  Text: String,
  Video: String,
 
  audit: CommonFieldsSchema
});

 const ScrollingVideoModel =mongoose.model("ScrollingVideo", ScrollingVideoSchema);
module.exports = ScrollingVideoModel;
