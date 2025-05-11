const mongoose = require("mongoose");
const CommonFieldsSchema = require('./CommonFields');

const SectionSchema = new mongoose.Schema({
    type: {
      type: String,
      required: true,
      enum: ['hero', 'feature', 'team', 'custom'], // allow for extensible sections
    },
    title: String,
    subtitle: String,
    content: String,
    image: String, // URL of image
    images: [String], // optional array of images
    buttonText: String,
    buttonLink: String,
    order: Number, // to control section display order
    teamMembers: [
      {
        name: String,
        role: String,
        image: String,
        bio: String,
      }
    ]
  }, { _id: false });

const AboutUsSchema = new mongoose.Schema({

      pageTitle: String,
      pageDescription: String,
      sections: [SectionSchema],
      audit:CommonFieldsSchema
    });


const AboutUsModel = mongoose.model('AboutUs', AboutUsSchema);

module.exports = AboutUsModel;




