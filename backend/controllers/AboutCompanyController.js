const AboutUs = require('../Models/Aboutus')

const postAboutusData = async (req, res) => {
    const { imgurl,headtext,bodytext } = req.body;
    try {
        const newAboutus = new AboutUs({ imgurl,headtext,bodytext });
        await newAboutus.save();
        res.status(201).json(newAboutus);
    } catch (err) {
        res.status(500).send(err);
    }
};


const getAboutusData = async (req, res) => {
    try {
        const aboutuscompdata = await AboutUs.find();
        res.json(aboutuscompdata);
    } catch (err) {
        res.status(500).send(err);
    }
};

const updateaboutus = (req, res) => {
    AboutUs.findByIdAndUpdate(req.params.id, req.body)
      .then(Aboutusdata => res.json({ msg: 'Updated successfully' }))
      .catch(err =>
        res.status(400).json({ error: 'Unable to update the Database' })
      );
  };



  module.exports = {postAboutusData,getAboutusData,updateaboutus}

  //added the RM0022 branch to main branch 
//   added new branch RM0024
//checked the working
