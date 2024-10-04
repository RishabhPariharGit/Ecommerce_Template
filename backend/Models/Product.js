const mongoose = require('mongoose');
const { ProductStatus } = require('../Enum/Enum'); // Importing the enum

const ProductSchema = new mongoose.Schema({
    Name: { 
        type: String, 
        required: true 
    },
    Description: { 
        type: String 
    },
    Price: { 
        type: Number, 
        required: true 
    },
    Quantity: { 
        type: Number, 
        required: true 
    },
    CategoryId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',  
        required: true
    },
    SubcategoryId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Subcategory', 
        required: false
    },
    Product_image: { 
        type: String, 
        required: true 
    },
    Slug: {
        type: String,
        required: true
    },
    SKU: {
        type: String,
        required: true
    },
    Brand: {
        type: String,
        required: true
    },
    Status: {
        type: String,
        enum: Object.values(ProductStatus),  // Using the enum values
        required: true
    },
    Tags: {
        type: String,
        required: true
    },
    Created_at: { 
        type: Date, 
        default: Date.now 
    },
    Updated_at: { 
        type: Date, 
        default: Date.now 
    }
});



const ProductModel = mongoose.model('Product', ProductSchema);

module.exports = ProductModel;
