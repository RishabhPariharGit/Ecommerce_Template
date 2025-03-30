const mongoose = require('mongoose');
const CommonFieldsSchema = require('./CommonFields');

const HomepageSectionSchema = new mongoose.Schema({
    Title: {
        type: String,
        required: true, 
    },
    SectionType: {
        type: String,
        enum: ['Category', 'Subcategory', 'Product']
       
    },
    Items: [{
        type: mongoose.Schema.Types.ObjectId,
        refPath: 'SectionType'
       
    }],
    DisplayOrder: {
        type: Number,
        default: 0, 
    },

    AddToSidenav: 
    { type: Boolean, 
    default: false
     },
     audit: CommonFieldsSchema
  
});



const HomepageSectionModel = mongoose.model('HomepageSection', HomepageSectionSchema);

module.exports = HomepageSectionModel;
