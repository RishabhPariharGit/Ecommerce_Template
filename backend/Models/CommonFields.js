const mongoose = require("mongoose");
const { GeneralStatus } = require('../Enum/Enum'); 

const CommonFieldsSchema = new mongoose.Schema({
  createdDate: { type: Date, default: Date.now },
  createdBy: { type: String, required: true },
  updatedDate: { type: Date, default: Date.now },
  updatedBy: { type: String },
  status: {
    type: String,
    enum: Object.values(GeneralStatus), 
    required: true
  }
}, { _id: false }); // Disable _id field

module.exports = CommonFieldsSchema;
