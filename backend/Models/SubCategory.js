const mongoose = require("mongoose");
const { GeneralStatus } = require('../Enum/Enum'); 
const CommonFieldsSchema = require('./CommonFields');

const SubcategorySchema = new mongoose.Schema({
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
    CategoryId: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required: true
    }],
    Show_In_Colletion_Grid: { 
        type:Boolean,
        default: false
    },
    ISLandscape: { 
        type:Boolean,
        default: false
    },
    audit: CommonFieldsSchema
});


const SubcategoryModel = mongoose.model('Subcategory', SubcategorySchema);

module.exports = SubcategoryModel;
