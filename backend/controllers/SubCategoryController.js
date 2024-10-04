const SubCategory = require('../Models/SubCategory')
const fs = require('fs');  

const CreateSubcategory = async (req, res) => {
    console.log("sub ctaegory",req.body)
    const { Name, Description, Slug,label_image,CategoryId } = req.body;

    try {
        const existingSubcategory = await SubCategory.findOne({ Slug });
        if (existingSubcategory) {
            return res.status(400).json({ message: 'Slug must be unique' });
        }
        let uploadedImageUrl = '';
        if (label_image) {  
            const filePath = label_image;
            
            try {
                const cloudinary = req.app.locals.cloudinary;               
                const result = await cloudinary.uploader.upload(filePath, {
                    folder: 'subcategories'
                });
                console.log("result",result)
                uploadedImageUrl = result.secure_url;

            } catch (error) {
                console.log(error)
                return res.status(500).json({ message: 'Error uploading image to Cloudinary', error });
            }
        } else {
            return res.status(400).json({ message: 'Image file is required' });
        }
       
        const newSubcategory = new SubCategory({
            Name,
            Description,
            label_image: uploadedImageUrl,  
            Slug,
            CategoryId
        });
        console.log("newsub",newSubcategory)
        const savedSubcategory = await newSubcategory.save();
        res.status(201).json({
            message: 'Subcategory created successfully!',
            Subcategory: savedSubcategory
        });
    } catch (err) {
        res.status(500).json({ message: 'Error creating Subcategory', error: err });
    }
};

const GetAllSubCategories = async (req, res) => {
    try {
       
        const subcategories = await SubCategory.find();
      
        if (!subcategories || subcategories.length === 0) {
            return res.status(404).json({ message: 'No subcategories found' });
        }     
        return res.status(200).json(subcategories);
    } catch (err) {
        console.error("Error:", err);
   
        return res.status(500).json({ message: "Internal Server Error" });
    }
};


const GetAllSubCategoriesByCategoryId = async (req, res) => {
    try {
        console.log(req.body)
        const { CategoryId } = req.body; 

 
        const subcategories = await SubCategory.find({ CategoryId });

        if (!subcategories || subcategories.length === 0) {
            return res.status(404).json({ message: 'No subcategories found' });
        }

        return res.status(200).json(subcategories);
    } catch (err) {
        console.error("Error:", err);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};

module.exports = { CreateSubcategory,GetAllSubCategories,GetAllSubCategoriesByCategoryId };
