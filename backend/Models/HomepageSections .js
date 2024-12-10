const mongoose = require('mongoose');

const HomepageSectionSchema = new mongoose.Schema({
    Title: {
        type: String,
        required: true, 
    },
    SectionType: {
        type: String,
        enum: ['Category', 'Subcategory', 'Product'], 
        required: true,
    },
    Items: [{
        type: mongoose.Schema.Types.ObjectId,
        refPath: 'SectionType', 
        required: true,
    }],
    DisplayOrder: {
        type: Number,
        default: 0, 
    },
    Status: {
        type: String,
        enum: ['Active', 'Inactive'], 
        required: true,
    },
    Created_at: {
        type: Date,
        default: Date.now,
    },
    Updated_at: {
        type: Date,
        default: Date.now,
    },
});

HomepageSectionSchema.pre('save', function (next) {
    this.Updated_at = Date.now();
    next();
});

const HomepageSectionModel = mongoose.model('HomepageSection', HomepageSectionSchema);

module.exports = HomepageSectionModel;
