const PlansMonthly = require('../Model/Plans')

const postPlansData = async (req, res) => {
    const { Title,Price,Offerdetails } = req.body;
    try {
        const newplansdata = new PlansMonthly({ Title,Price,Offerdetails });
        await newplansdata.save();
        res.status(201).json(newplansdata);
    } catch (err) {
        res.status(500).send(err);
    }
};



const getPlansData = async (req, res) => {
    try {
        const plansdata = await PlansMonthly.find();
        res.json(plansdata);
    } catch (err) {
        res.status(500).send(err);
    }
};


module.exports = {postPlansData, getPlansData}