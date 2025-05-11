const mongoose = require("mongoose");
const CommonFieldsSchema = require('./CommonFields');
const sectionSchema = new mongoose.Schema({
  heading: { type: String, required: true },
  description: { type: String},
  points: [{ type: String }] 
});

const PolicySchema = new mongoose.Schema({
  title: { type: String, required: true },
  Slug: { type: String, required: true, unique: true },
  effectiveDate: { type: Date, required: true },
  sections: [sectionSchema],
  audit: CommonFieldsSchema
});

const PolicyModel = mongoose.model("Policy", PolicySchema);
module.exports =PolicyModel;
