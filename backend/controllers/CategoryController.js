const CategoryModel = require('../Models/Category');
const SubCategory =require('../Models/SubCategory');
const ProductModel =require('../Models/Product')
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
const GetCategoryBySlug = async (req, res) => {
    try {
        const { Slug } = req.params;  
        console.log("slug",req.params)      
        const category = await CategoryModel.findOne({ Slug });   
        console.log(category)
        if (!category) {
            return res.status(404).json({ message: 'Category not found' });
        }   
        return res.status(200).json(category);
    } catch (err) {
        console.error("Error:", err);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};
const UpdateCategory = async (req, res) => {
    const { slug } = req.params;
    const { Name, Description, label_image } = req.body;

    try {
        // Find the category by slug
        const existingCategory = await CategoryModel.findOne({ Slug: slug });
        if (!existingCategory) {
            return res.status(404).json({ message: 'Category not found' });
        }

        // Handle image upload if new image is provided
        let uploadedImageUrl = existingCategory.label_image;
        if (label_image && label_image !== existingCategory.label_image) {
            try {
                const cloudinary = req.app.locals.cloudinary;

                // Delete the old image from Cloudinary if it exists
                if (existingCategory.label_image) {
                    const public_id = existingCategory.label_image.split('/').pop().split('.')[0];
                    await cloudinary.uploader.destroy(`categories/${public_id}`);
                }

                // Upload the new image
                const result = await cloudinary.uploader.upload(label_image, {
                    folder: 'categories'
                });
                uploadedImageUrl = result.secure_url;
            } catch (error) {
                console.log(error);
                return res.status(500).json({ message: 'Error uploading image to Cloudinary', error });
            }
        }

        // Update category fields
        existingCategory.Name = Name;
        existingCategory.Description = Description;
        existingCategory.label_image = uploadedImageUrl;

        // Save the updated category
        const updatedCategory = await existingCategory.save();

        res.status(200).json({
            message: 'Category updated successfully!',
            category: updatedCategory
        });
    } catch (err) {
        console.error("Error:", err);
        res.status(500).json({ message: 'Error updating category', error: err });
    }
};
const DeleteCategory = async (req, res) => {
    const { id } = req.params;

    try {
        // Find the category by ID
        const category = await CategoryModel.findById(id);
        if (!category) {
            return res.status(404).json({ message: 'Category not found' });
        }

        const cloudinary = req.app.locals.cloudinary;

        // Delete related subcategories
        const subcategories = await SubCategory.find({ CategoryId: category._id });
        for (const subcategory of subcategories) {
            if (subcategory.label_image) {
                const public_id = subcategory.label_image.split('/').pop().split('.')[0];
                await cloudinary.uploader.destroy(`subcategories/${public_id}`);
            }
        }
        await SubCategory.deleteMany({ CategoryId: category._id });

        // Delete related products
        const products = await ProductModel.find({ CategoryId: category._id });
        for (const product of products) {
            if (product.Product_image) {
                const public_id = product.Product_image.split('/').pop().split('.')[0];
                await cloudinary.uploader.destroy(`products/${public_id}`);
            }
        }
        await ProductModel.deleteMany({ CategoryId: category._id });

        // Delete the category image from Cloudinary
        if (category.label_image) {
            const public_id = category.label_image.split('/').pop().split('.')[0];
            await cloudinary.uploader.destroy(`categories/${public_id}`);
        }

        // Delete the category
        await CategoryModel.findByIdAndDelete(id);

        res.status(200).json({ message: 'Category, subcategories, products, and their images deleted successfully!' });
    } catch (err) {
        console.error("Error deleting category:", err);
        res.status(500).json({ message: 'Error deleting category', error: err });
    }
};


module.exports = { GetAllCategories,CreateCategory,GetCategoryBySlug,UpdateCategory,DeleteCategory };

``

