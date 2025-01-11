const mongoose = require("mongoose");
const { GeneralStatus } = require('../Enum/Enum'); 
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
    CategoryId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',  // Reference to Category table
        required: true
    },
    Status: {
        type: String,
        enum: Object.values(GeneralStatus), // Using enum for product status
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

SubcategorySchema.pre('save', function (next) {
    this.Updated_at = Date.now();
    next();
});

const SubcategoryModel = mongoose.model('Subcategory', SubcategorySchema);

module.exports = SubcategoryModel;
