const mongoose = require("mongoose");


const UserSchema= mongoose.Schema({
    Name:String,
    Username: String,
    Email: String,
    Phone:Number,
    Password: String,
    Role:String,
    IsAdmin:Boolean,
    IsSystemAdmin:Boolean,


})
const USerModel = mongoose.model( "User",UserSchema);

module.exports = USerModel;



