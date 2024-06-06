const mongoose = require("mongoose");


const UserSchema= mongoose.Schema({
    Name:String,
    Username: String,
    Email: String,
    Phone:Number,
    password: String,
   Role:String,
   Syst:Boolean

})
const USerModel = mongoose.model( "USer",UserSchema);

module.exports = USerModel;



