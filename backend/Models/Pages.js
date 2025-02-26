const mongoose = require('mongoose');
const { GeneralStatus } = require('../Enum/Enum'); 
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
    Status: {
        type: String,
        enum: Object.values(GeneralStatus), // Using enum for product status
        required: true
    },
    TemplateId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Template', // Reference to the Template schema
      default: null, // Optional: default to null if no template is selected
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
  

  
  module.exports = mongoose.model('Page', pageSchema);
  