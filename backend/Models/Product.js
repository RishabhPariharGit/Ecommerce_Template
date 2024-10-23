const mongoose = require('mongoose');
const { ProductStatus, AllSize } = require('../Enum/Enum'); // Importing enums

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
        required: true,
        unique: true // Ensures slug is unique
    },
    SKU: {
        type: String,
        required: true,
        unique: true // Ensures SKU is unique
    },
    Brand: {
        type: String,
        required: true
    },
    SizeType: {
        type: String,
        enum: Object.keys(AllSize), // Validate size type (e.g., 'Clothing', 'Shoes', 'Pants')
        required: false
    },
    Sizes: {
        type: [String], // Array to support multiple size options
        required: false,
        validate: {
            validator: function (sizes) {
                const validSizes = this.SizeType ? AllSize[this.SizeType] : [];
                return sizes.every(size => 
                    Array.isArray(validSizes) 
                        ? validSizes.includes(size) 
                        : Object.values(validSizes).flat().includes(size)
                );
            },
            message: 'Invalid size(s) for the selected SizeType.'
        }
    },
    Status: {
        type: String,
        enum: Object.values(ProductStatus), // Using enum for product status
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

// Pre-save middleware to update the 'Updated_at' timestamp on modification
ProductSchema.pre('save', function (next) {
    this.Updated_at = Date.now();
    next();
});

const ProductModel = mongoose.model('Product', ProductSchema);

module.exports = ProductModel;
