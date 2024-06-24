const mongoose = require("mongoose");


const PlansSchema= mongoose.Schema({
    Title:String,
    Price:String,
    Offerdetails:String

})
const PlansMonthly = mongoose.model( "Monthlyplan", PlansSchema);

module.exports = PlansMonthly;