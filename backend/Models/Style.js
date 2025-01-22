const mongoose = require('mongoose');

const styleSchema = new mongoose.Schema({
  name: { type: String, required: true, default: 'Default Styling' }, // Styling name or preset
  backgroundColor: { type: String, default: '#FFFFFF' }, // Default background color
  fontColor: { type: String, default: '#000000' }, // Default font color
  fontFamily: { type: String, default: 'Montserrat' }, // Font family
  fontSize: {
    header: { type: String, default: '40px' },
    subHeader: { type: String, default: '20px' },
    body: { type: String, default: '18px' }
  },
  fontWeight: {
    header: { type: String, default: '700' },
    subHeader: { type: String, default: '700' },
    body: { type: String, default: '400' }
  },
  margin: { type: String, default: '20px' },
  padding: { type: String, default: '20px' },
  page: { type: mongoose.Schema.Types.ObjectId, ref: 'Page', default: null }, // Foreign key for Pages
  templateId: { type: mongoose.Schema.Types.ObjectId, ref: 'Template', default: null }, // Foreign key for Templates
  section: { type: mongoose.Schema.Types.ObjectId, ref: 'Section', default: null } // Foreign key for Sections
});

module.exports = mongoose.model('Style', styleSchema);
