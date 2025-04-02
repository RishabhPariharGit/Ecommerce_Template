const mongoose = require("mongoose");
const CommonFieldsSchema = require('./CommonFields');

const AnnouncementSchema = new mongoose.Schema({
    Text: { type: String, required: true },
    ShowInSite: { type: Boolean, default: false }, 
    audit: CommonFieldsSchema
});



const AnnouncementModel = mongoose.model('Announcement', AnnouncementSchema);

module.exports = AnnouncementModel;
