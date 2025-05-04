const mongoose = require("mongoose");
const CommonFieldsSchema = require('./CommonFields');

const ScrollingTextSchema = new mongoose.Schema({

  Text: String,
  isMegaText: {
    type: Boolean,
    default: false  // false for normal scrolling text, true for mega
  },
  audit: CommonFieldsSchema
});

 const ScrollingTextModel =mongoose.model("ScrollingText", ScrollingTextSchema);
module.exports = ScrollingTextModel;
