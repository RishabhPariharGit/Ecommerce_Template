const mongoose = require("mongoose");
const CommonFieldsSchema = require('./CommonFields');
const RoleSchema = new mongoose.Schema({
    RoleName: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    userId: { // Correct casing (lowercase 'u')
        type: mongoose.Schema.Types.ObjectId,  
        ref: 'User',  
        required: true 
    },
    audit: CommonFieldsSchema
});

const RoleModel = mongoose.model("Role", RoleSchema);
module.exports = RoleModel;
