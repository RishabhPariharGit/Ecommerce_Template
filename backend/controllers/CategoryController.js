const CategoryModel = require('../Models/Category');
const SubCategory = require('../Models/SubCategory');
const ProductModel = require('../Models/Product')
const fs = require('fs');
const { GeneralStatus } = require('../Enum/Enum');

const CreateCategory = async (req, res) => {
    const { Name, Description, Slug, label_image } = req.body;
    
    try {
        if (!req.user || !req.user._id) {
            return res.status(401).json({ message: 'Unauthorized: User not found' });
        }
        // Check if category with the given slug already exists
        const existingCategory = await CategoryModel.findOne({ Slug });
        if (existingCategory) {
            return res.status(400).json({ 
                message: 'Slug must be unique', 
                data: null 
            });
        }

        let uploadedImageUrl = '';
        if (label_image) {
            try {
                const cloudinary = req.app.locals.cloudinary;
                const result = await cloudinary.uploader.upload(label_image, {
                    folder: 'categories'
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

        // Create a new category
        const newCategory = new CategoryModel({
            Name,
            Description,
            label_image: uploadedImageUrl,
            Slug,
            audit: {
                createdDate: new Date(),
                createdBy: req.user._id,  
                updatedDate: new Date(),
                updatedBy: req.user._id, 
                status: GeneralStatus.ACTIVE
            }
        });

        const savedCategory = await newCategory.save();

        return res.status(201).json({
            message: 'Category created successfully!',
            data: savedCategory
        });

    } catch (err) {
        console.error("Error creating category:", err);
        return res.status(500).json({ 
            message: 'Error creating category', 
            data: null, 
            error: err 
        });
    }
};


const GetAllCategories = async (req, res) => {
    try {
        const categories = await CategoryModel.find();
        if (!categories || categories.length === 0) {
            return res.status(404).json({ 
                message: 'No categories found', 
                data: [] // Ensure data is always present
            });
        }

        const subcategories = await SubCategory.find();
        const categoryWithSubcategories = categories.map((category) => {
            const relatedSubcategories = subcategories.filter(
                (sub) => sub.CategoryId.toString() === category._id.toString()
            );
            return { ...category._doc, subcategories: relatedSubcategories };
        });

        return res.status(200).json({
            message: "Successfully retrieved categories",
            data: categoryWithSubcategories
        });

    } catch (err) {
        console.error("Error:", err);
        return res.status(500).json({ 
            message: "Internal Server Error", 
            data: [] 
        });
    }
};


const GetCategoryBySlug = async (req, res) => {
    try {
        const { Slug } = req.params;
        const category = await CategoryModel.findOne({ Slug });

        if (!category) {
            return res.status(404).json({ 
                message: 'Category not found', 
                data: null 
            });
        }

        return res.status(200).json({
            message: "Successfully retrieved category",
            data: category
        });

    } catch (err) {
        console.error("Error:", err);
        return res.status(500).json({ 
            message: "Internal Server Error", 
            data: null 
        });
    }
};

const UpdateCategory = async (req, res) => {
    const { slug } = req.params;
    const { Name, Description, label_image, Status } = req.body;

    try { 
        if (!req.user || !req.user._id) {
            return res.status(401).json({ message: 'Unauthorized: User not found' });
        }        
        const existingCategory = await CategoryModel.findOne({ Slug: slug });
        if (!existingCategory) {
            return res.status(404).json({ 
                message: 'Category not found', 
                data: null 
            });
        }

        let uploadedImageUrl = existingCategory.label_image;
        if (label_image && label_image !== existingCategory.label_image) {
            try {
                const cloudinary = req.app.locals.cloudinary;
                if (existingCategory.label_image) {
                    const public_id = existingCategory.label_image.split('/').pop().split('.')[0];
                    await cloudinary.uploader.destroy(`categories/${public_id}`);
                }
                const result = await cloudinary.uploader.upload(label_image, {
                    folder: 'categories'
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

        existingCategory.Name = Name;
        existingCategory.Description = Description;
        existingCategory.label_image = uploadedImageUrl;
        existingCategory.audit.status = Status;
        existingCategory.audit.updatedDate = new Date();
        existingCategory.audit.updatedBy = req.user._id;

        const updatedCategory = await existingCategory.save();

        return res.status(200).json({
            message: 'Category updated successfully!',
            data: updatedCategory
        });

    } catch (err) {
        console.error("Error:", err);
        return res.status(500).json({ 
            message: 'Error updating category', 
            data: null, 
            error: err 
        });
    }
};

const DeleteCategory = async (req, res) => {
    const { id } = req.params;

    try {
        const category = await CategoryModel.findById(id);
        if (!category) {
            return res.status(404).json({ 
                message: 'Category not found', 
                data: null 
            });
        }

        const cloudinary = req.app.locals.cloudinary;

        // Delete subcategory images from Cloudinary
        const subcategories = await SubCategory.find({ CategoryId: category._id });
        for (const subcategory of subcategories) {
            if (subcategory.label_image) {
                const public_id = subcategory.label_image.split('/').pop().split('.')[0];
                await cloudinary.uploader.destroy(`subcategories/${public_id}`);
            }
        }

        // Delete subcategories from the database
        await SubCategory.deleteMany({ CategoryId: category._id });

        // Delete product images from Cloudinary
        const products = await ProductModel.find({ CategoryId: category._id });
        for (const product of products) {
            if (product.Product_image) {
                const public_id = product.Product_image.split('/').pop().split('.')[0];
                await cloudinary.uploader.destroy(`products/${public_id}`);
            }
        }

        // Delete products from the database
        await ProductModel.deleteMany({ CategoryId: category._id });

        // Delete category image from Cloudinary
        if (category.label_image) {
            const public_id = category.label_image.split('/').pop().split('.')[0];
            await cloudinary.uploader.destroy(`categories/${public_id}`);
        }

        // Delete category from the database
        await CategoryModel.findByIdAndDelete(id);

        return res.status(200).json({ 
            message: 'Category, subcategories, products, and their images deleted successfully!', 
            data: null 
        });

    } catch (err) {
        console.error("Error deleting category:", err);
        return res.status(500).json({ 
            message: 'Error deleting category', 
            data: null, 
            error: err 
        });
    }
};




const GetAll_Active_Categories = async (req, res) => {
    try {
        const categories = await CategoryModel.find();
        if (!categories || categories.length === 0) {
            return res.status(404).json({ 
                message: 'No categories found', 
                data: [] // Ensure data is always present
            });
        }

        const subcategories = await SubCategory.find();
        const categoryWithSubcategories = categories.map((category) => {
            const relatedSubcategories = subcategories.filter(
                (sub) => sub.CategoryId.toString() === category._id.toString()
            );
            return { ...category._doc, subcategories: relatedSubcategories };
        });

        return res.status(200).json({
            message: "Successfully retrieved categories",
            data: categoryWithSubcategories
        });

    } catch (err) {
        console.error("Error:", err);
        return res.status(500).json({ 
            message: "Internal Server Error", 
            data: [] 
        });
    }
};


module.exports = { GetAllCategories, CreateCategory, GetCategoryBySlug, UpdateCategory, DeleteCategory, GetAll_Active_Categories };



