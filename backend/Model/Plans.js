const mongoose = require("mongoose");


const PlansSchema= mongoose.Schema({
    OfferDetails:String,

})
const PlansMonthly = mongoose.model( "Monthlyplan", PlansSchema);

module.exports = PlansMonthly;