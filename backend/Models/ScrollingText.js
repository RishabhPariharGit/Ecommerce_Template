const mongoose = require("mongoose");
const CommonFieldsSchema = require('./CommonFields');

const ScrollingTextSchema = new mongoose.Schema({

  Text: String,

  audit: CommonFieldsSchema
});

 const ScrollingTextModel =mongoose.model("ScrollingText", ScrollingTextSchema);
module.exports = ScrollingTextModel;
