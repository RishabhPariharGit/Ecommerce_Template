const mongoose = require('mongoose');
const { GeneralStatus } = require('../Enum/Enum'); 
const CommonFieldsSchema = require('./CommonFields');
const pageSchema = new mongoose.Schema({

    Title: {
      type: String,
      required: true
      
    },
    Slug: {
      type: String,
      required: true,
    },
    Url: {
        type: String,
      },
    Content: String,
    Images: [
      {
        type: String, // Store the URLs of images
      },
    ],
    Visibility: {
      type: String,
      enum: ['visible', 'hidden'],
      default: 'hidden',
    },
    Visibility_date: Date,
    
   
    audit: CommonFieldsSchema
    
  });
  

  
  module.exports = mongoose.model('Page', pageSchema);
  