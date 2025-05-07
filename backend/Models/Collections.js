const mongoose = require("mongoose");
const { GeneralStatus } = require('../Enum/Enum'); 
const CommonFieldsSchema = require('./CommonFields');

const CollectionSchema = new mongoose.Schema({
    Name: { 
        type: String, 
        required: true 
    },
    Description: {
        type: String
    },
   
    SubcategoryId: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Subcategory',
        required: true
    }],

    ProductId: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true
    }],
    Show_InHomepage: { 
        type:Boolean,
        default: false
    },
    Show_InProductpage: { 
        type:Boolean,
        default: false
    },

    Add_collections: { 
        type:Boolean,
        default: false
    },
    Add_Products: { 
        type:Boolean,
        default: false
    },
    audit: CommonFieldsSchema
});


const CollectionModel = mongoose.model('Collection', CollectionSchema);

module.exports = CollectionModel;
