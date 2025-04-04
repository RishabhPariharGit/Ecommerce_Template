
const ImageSliderModel = require('../Models/ImageSlider');
const fs = require('fs');
const { GeneralStatus } = require('../Enum/Enum');

const CreateImageSlider = async (req, res) => {
    const { Image,Text, Link,Description } = req.body;
    if (!req.user || !req.user._id) {
        return res.status(401).json({ message: 'Unauthorized: User not found' });
    }
    try {

        let uploadedImageUrl = '';
        if (Image) {
            try {
                const cloudinary = req.app.locals.cloudinary;
                const result = await cloudinary.uploader.upload(Image, {
                    folder: 'ImageSlider'
                });
                uploadedImageUrl = result.secure_url;
            } catch (error) {
                console.error("Error uploading image:", error);
                return res.status(500).json({ 
                    message: 'Error uploading image to Cloudinary', 
                    data: null, 
                    error 
                });
            }
        } else {
            return res.status(400).json({ 
                message: 'Image file is required', 
                data: null 
            });
        }

        // Create a new ImageSlider
        const newImageSlider = new ImageSliderModel({
            Image: uploadedImageUrl,
            Text,
            Link,
            Description,
            audit: {
                createdDate: new Date(),
                createdBy: req.user._id,  
                updatedDate: new Date(),
                updatedBy: req.user._id, 
                status: GeneralStatus.ACTIVE
            }
        });

       
        const savedImageSlider = await newImageSlider.save();

        return res.status(201).json({
            message: 'ImageSlider created successfully!',
            data: savedImageSlider
        });

    } catch (err) {
        console.error("Error creating ImageSlider:", err);
        return res.status(500).json({ 
            message: 'Error creating ImageSlider', 
            data: null, 
            error: err 
        });
    }
};


const GetAllImageSliders = async (req, res) => {
    try {
        const ImageSliders = await ImageSliderModel.find();
        if (!ImageSliders || ImageSliders.length === 0) {
            return res.status(404).json({ 
                message: 'No ImageSliders found', 
                data: [] // Ensure data is always present
            });
        }
        return res.status(200).json({
            message: "Successfully retrieved ImageSliders",
            data: ImageSliders
        });

    } catch (err) {
        console.error("Error:", err);
        return res.status(500).json({ 
            message: "Internal Server Error", 
            data: [] 
        });
    }
};

const GetImageSliderById = async (req, res) => {
    try {
        const { Id } = req.params;
        const ImageSlider = await ImageSliderModel.findById({ _id: Id });

        if (!ImageSlider) {
            return res.status(404).json({ 
                message: 'ImageSlider not found', 
                data: null 
            });
        }

        return res.status(200).json({
            message: "Successfully retrieved ImageSlider",
            data: ImageSlider
        });

    } catch (err) {
        console.error("Error:", err);
        return res.status(500).json({ 
            message: "Internal Server Error", 
            data: null 
        });
    }
};

const UpdateImageSlider = async (req, res) => {
    const { Id } = req.params;
    const { Image,Text, Link  ,Description, Status} = req.body;

    try {  
        if (!req.user || !req.user._id) {
            return res.status(401).json({ message: 'Unauthorized: User not found' });
        }      
        const existingImageSlider = await ImageSliderModel.findOne({ _id: Id });
        if (!existingImageSlider) {
            return res.status(404).json({ 
                message: 'ImageSlider not found', 
                data: null 
            });
        }
        let uploadedImageUrl = existingImageSlider.Image;
        if (Image && Image !== existingImageSlider.Image) {
            try {
                const cloudinary = req.app.locals.cloudinary;
                if (existingImageSlider.Image) {
                    const public_id = existingImageSlider.Image.split('/').pop().split('.')[0];
                    await cloudinary.uploader.destroy(`ImageSlider/${public_id}`);
                }
                const result = await cloudinary.uploader.upload(Image, {
                    folder: 'ImageSlider'
                });
                uploadedImageUrl = result.secure_url;
            } catch (error) {
                console.error("Cloudinary Upload Error:", error);
                return res.status(500).json({ 
                    message: 'Error uploading image to Cloudinary', 
                    data: null, 
                    error 
                });
            }
        }
       
        existingImageSlider.Image = uploadedImageUrl;
        existingImageSlider.Text = Text;
        existingImageSlider.Link = Link;
        existingImageSlider.Description = Description;
        existingImageSlider.audit.status = Status;
        existingImageSlider.audit.updatedDate = new Date();
        existingImageSlider.audit.updatedBy = req.user._id;

        const updatedImageSlider = await existingImageSlider.save();

        return res.status(200).json({
            message: 'ImageSlider updated successfully!',
            data: updatedImageSlider
        });

    } catch (err) {
        console.error("Error:", err);
        return res.status(500).json({ 
            message: 'Error updating ImageSlider', 
            data: null, 
            error: err 
        });
    }
};

const DeleteImageSlider = async (req, res) => {
    const { id } = req.params;

    try {
        const ImageSlider = await ImageSliderModel.findById(id);
        if (!ImageSlider) {
            return res.status(404).json({ 
                message: 'ImageSlider not found', 
                data: null 
            });
        }

        await ImageSliderModel.findByIdAndDelete(id);

        return res.status(200).json({ 
            message: 'ImageSlider, subImageSliders, products, and their images deleted successfully!', 
            data: null 
        });

    } catch (err) {
        console.error("Error deleting ImageSlider:", err);
        return res.status(500).json({ 
            message: 'Error deleting ImageSlider', 
            data: null, 
            error: err 
        });
    }
};

const GetAll_Active_ImageSliders = async (req, res) => {
    try {
        const ImageSliders = await ImageSliderModel.find({
            "audit.status": "Active"
        });
        
        if (!ImageSliders || ImageSliders.length === 0) {
            return res.status(404).json({ 
                message: 'No ImageSliders found', 
                data: [] // Ensure data is always present
            });
        }
        return res.status(200).json({
            message: "Successfully retrieved ImageSliders",
            data: ImageSliders
        });

    } catch (err) {
        console.error("Error:", err);
        return res.status(500).json({ 
            message: "Internal Server Error", 
            data: [] 
        });
    }
};

module.exports = { GetAllImageSliders, CreateImageSlider, GetImageSliderById, UpdateImageSlider, DeleteImageSlider, GetAll_Active_ImageSliders };



