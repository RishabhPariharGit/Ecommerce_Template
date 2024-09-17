const mongoose = require("mongoose");


const TestimonialsSchema= mongoose.Schema({
    Imgurl:String,
    Headtext:String,
    Bodytext: String
})
const TestimonialModel = mongoose.model( "Testimonial",TestimonialsSchema);

module.exports = TestimonialModel;