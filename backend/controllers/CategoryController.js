const CategoryModel = require('../Models/Category');
const fs = require('fs');  

const CreateCategory = async (req, res) => {
    const { Name, Description, Slug,label_image } = req.body;

    try {
        const existingCategory = await CategoryModel.findOne({ Slug });
        if (existingCategory) {
            return res.status(400).json({ message: 'Slug must be unique' });
        }
        let uploadedImageUrl = '';
        if (label_image) {  
            const filePath = label_image;
            
            try {
                const cloudinary = req.app.locals.cloudinary;               
                const result = await cloudinary.uploader.upload(filePath, {
                    folder: 'categories'
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
       
        const newCategory = new CategoryModel({
            Name,
            Description,
            label_image: uploadedImageUrl,  
            Slug
        });
        const savedCategory = await newCategory.save();
        res.status(201).json({
            message: 'Category created successfully!',
            category: savedCategory
        });
    } catch (err) {
        res.status(500).json({ message: 'Error creating category', error: err });
    }
};


// Function to get all categories
const GetAllCategories = async (req, res) => {
    try {
        // Fetch all categories from the database
        const categories = await CategoryModel.find(); // Assuming you're not excluding any fields

        // If no categories are found, return a 404 response
        if (!categories || categories.length === 0) {
            return res.status(404).json({ message: 'No categories found' });
        }

        // Return the categories in the response with a 200 status
        return res.status(200).json(categories);
    } catch (err) {
        console.error("Error:", err);
        // Return a 500 status with an error message for any server-side error
        return res.status(500).json({ message: "Internal Server Error" });
    }
};

module.exports = { GetAllCategories,CreateCategory };

``

