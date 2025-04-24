const mongoose = require('mongoose');
const { ProductStatus, AllSize,Gender } = require('../Enum/Enum'); // Importing enums
const CommonFieldsSchema = require('./CommonFields');

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
    SubcategoryId: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Subcategory', 
        required: false
    }],
    Product_Main_image: { 
        type: String, 
        required: true 
    },
    Product_image: { 
        type: [String], 
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
    Gender: {
        type: String,
        enum: Gender,
        required: false
    },
    
    SizeType: {
        type: String,
        enum: Object.keys(AllSize), // Validate size type (e.g., 'Clothing', 'Shoes', 'Pants')
        required: false
    },
    Sizes: {
        type: [String],
        required: false,
        validate: {
          validator: function (sizes) {
            if (!this.SizeType || !this.Gender) return false;
            const validSizeList = AllSize[this.SizeType]?.[this.Gender];
      
            if (this.SizeType === 'Pants') {
              const waistSizes = validSizeList?.Waist || [];
              const lengthSizes = validSizeList?.Length || [];
      
              return sizes.every(size => {
                if (!size.includes('-')) return false;
                const [prefix, val] = size.split('-'); // e.g., "W-30W", "L-32L"
      
                if (prefix === 'W') {
                  return waistSizes.includes(val); // Check against Waist sizes
                } else if (prefix === 'L') {
                  return lengthSizes.includes(val); // Check against Length sizes
                }
                return false;
              });
            }
      
            if (typeof validSizeList === 'object') {
              return sizes.every(size => Object.values(validSizeList).flat().includes(size));
            }
      
            if (Array.isArray(validSizeList)) {
              return sizes.every(size => validSizeList.includes(size));
            }
      
            return false;
          },
          message: 'Invalid size(s) for the selected SizeType and Gender.'
        }
      }
      
      
    ,
    Tags: {
        type: String,
        required: true
    },
    audit: CommonFieldsSchema
});



const ProductModel = mongoose.model('Product', ProductSchema);

module.exports = ProductModel;
