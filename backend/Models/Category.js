const mongoose = require("mongoose");
const { GeneralStatus } = require('../Enum/Enum'); 
const CommonFieldsSchema = require('./CommonFields');

const CategorySchema = new mongoose.Schema({
    Name: { 
        type: String, 
        required: true 
    },
    Description: {
        type: String
    },
    label_image: { 
        type: String, 
        required: true 
    },
    Slug: {
        type: String,
        required: true
    },
    audit: CommonFieldsSchema
});


const CategoryModel = mongoose.model('Category', CategorySchema);

module.exports = CategoryModel;




