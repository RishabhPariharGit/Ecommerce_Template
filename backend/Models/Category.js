const mongoose = require("mongoose");
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
    Created_at: { 
        type: Date, 
        default: Date.now 
    },
    Updated_at: { 
        type: Date, 
        default: Date.now 
    }
});


CategorySchema.pre('save', function (next) {
    this.Updated_at = Date.now();
    next();
});


const CategoryModel = mongoose.model('Category', CategorySchema);

module.exports = CategoryModel;



