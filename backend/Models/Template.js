const mongoose = require('mongoose');

const templateSchema = new mongoose.Schema({
  name: { type: String, required: true }, // Template name (e.g., "Homepage Layout")
  layout: {
    header: { type: Boolean, default: true }, // Includes a header section
    footer: { type: Boolean, default: true }, // Includes a footer section
    sidebar: { type: Boolean, default: false }, // Includes a sidebar section
    mainBody: { type: Boolean, default: true } // Main content area
  },
  htmlContent: { type: String, required: true }, // HTML structure of the template
  cssContent: { type: String, default: '' }, // Inline CSS for the template
  jsContent: { type: String, default: '' }, // Optional JavaScript for the template
  createdAt: { type: Date, default: Date.now }, // Template creation date
  updatedAt: { type: Date, default: Date.now } // Template modification date
});

module.exports = mongoose.model('Template', templateSchema);
