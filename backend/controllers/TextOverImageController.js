const TextoverImage = require('../Model/TextOverImageModel')

const postTextOverImageData = async (req, res) => {
    const { Heading,Subhead,Imgurl } = req.body;
    try {
        const newTextOverimage = new TextoverImage({ Heading,Subhead,Imgurl });
        await newTextOverimage.save();
        res.status(201).json(newTextOverimage);
    } catch (err) {
        res.status(500).send(err);
    }
};


const getTextOverImageData = async (req, res) => {
    try {
        const textoverimagecompdata = await TextoverImage.find();
        res.json(textoverimagecompdata);
    } catch (err) {
        res.status(500).send(err);
    }
};


const updateTextOverImageData = (req, res) => {
    TextoverImage.findByIdAndUpdate(req.params.id, req.body)
      .then(TextOverImage => res.json({ msg: 'Updated successfully' }))
      .catch(err =>
        res.status(400).json({ error: 'Unable to update the Database' })
      );
  };


module.exports = {postTextOverImageData, getTextOverImageData, updateTextOverImageData}