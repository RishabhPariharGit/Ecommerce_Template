const TestimonialModel = require('../Model/Testimonials')

const postTestimonialsData = async (req, res) => {
    const { Imgurl,Headtext,Bodytext } = req.body;
    try {
        const newTestimonials = new TestimonialModel({ Imgurl,Headtext,Bodytext });
        await newTestimonials.save();
        res.status(201).json(newTestimonials);
    } catch (err) {
        res.status(500).send(err);
    }
};


const getTestimonialsData = async (req, res) => {
    try {
        const testimonialscompdata = await TestimonialModel.find();
        res.json(testimonialscompdata);
    } catch (err) {
        res.status(500).send(err);
    }
};


const updatetestimonial = (req, res) => {
    TestimonialModel.findByIdAndUpdate(req.params.id, req.body)
      .then(Testimonial => res.json({ msg: 'Updated successfully' }))
      .catch(err =>
        res.status(400).json({ error: 'Unable to update the Database' })
      );
  };


module.exports = {postTestimonialsData, getTestimonialsData, updatetestimonial}