const Bannerimage = require('../Model/Bannerimage')
const PlansMonthly = require('../Model/Plans')
const AboutUs = require('../Model/Aboutus')
const TestimonialModel = require('../Model/Testimonials')

const getBannerImgae = async (req, res) => {
    try {
        const images = await Bannerimage.find();
        res.json(images);
    } catch (err) {
        res.status(500).send(err);
    }
};

const postBannerImage = async (req, res) => {
    const { url } = req.body;
    try {
        const newImage = new Bannerimage({ url });
        await newImage.save();
        res.status(201).json(newImage);
    } catch (err) {
        res.status(500).send(err);
    }
};

module.exports = {getBannerImgae, postBannerImage}