const CategoryModel = require('../Models/Category');
const SubCategory = require('../Models/SubCategory');
const ProductModel = require('../Models/Product')
const fs = require('fs');
const { GeneralStatus } = require('../Enum/Enum');

const CreateCategory = async (req, res) => {
    const { Name, Description, Slug, label_image } = req.body;
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
                })
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
            Slug,
            Status: GeneralStatus.ACTIVE,
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
        const categories = await CategoryModel.find();
        if (!categories || categories.length === 0) {
            return res.status(404).json({ message: 'No categories found' });
        }
        const subcategories = await SubCategory.find();
        const categoryWithSubcategories = categories.map((category) => {
            const relatedSubcategories = subcategories.filter(
                (sub) => sub.CategoryId.toString() === category._id.toString()
            );
            return { ...category._doc, subcategories: relatedSubcategories };
        });

        return res.status(200).json(categoryWithSubcategories);
    } catch (err) {
        console.error("Error:", err);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};

const GetCategoryBySlug = async (req, res) => {
    try {
        const { Slug } = req.params;
        const category = await CategoryModel.findOne({ Slug });
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
    const { Name, Description, label_image,Status } = req.body;

    try {        
        const existingCategory = await CategoryModel.findOne({ Slug: slug });
        if (!existingCategory) {
            return res.status(404).json({ message: 'Category not found' });
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
                console.log(error);
                return res.status(500).json({ message: 'Error uploading image to Cloudinary', error });
            }
        }
        existingCategory.Name = Name;
        existingCategory.Description = Description;
        existingCategory.label_image = uploadedImageUrl;
        existingCategory.Status=Status;
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
        const category = await CategoryModel.findById(id);
        if (!category) {
            return res.status(404).json({ message: 'Category not found' });
        }
        const cloudinary = req.app.locals.cloudinary;
        const subcategories = await SubCategory.find({ CategoryId: category._id });
        for (const subcategory of subcategories) {
            if (subcategory.label_image) {
                const public_id = subcategory.label_image.split('/').pop().split('.')[0];
                await cloudinary.uploader.destroy(`subcategories/${public_id}`);
            }
        }
        await SubCategory.deleteMany({ CategoryId: category._id });
        const products = await ProductModel.find({ CategoryId: category._id });
        for (const product of products) {
            if (product.Product_image) {
                const public_id = product.Product_image.split('/').pop().split('.')[0];
                await cloudinary.uploader.destroy(`products/${public_id}`);
            }
        }
        await ProductModel.deleteMany({ CategoryId: category._id });
        if (category.label_image) {
            const public_id = category.label_image.split('/').pop().split('.')[0];
            await cloudinary.uploader.destroy(`categories/${public_id}`);
        }
        await CategoryModel.findByIdAndDelete(id);

        res.status(200).json({ message: 'Category, subcategories, products, and their images deleted successfully!' });
    } catch (err) {
        console.error("Error deleting category:", err);
        res.status(500).json({ message: 'Error deleting category', error: err });
    }
};


module.exports = { GetAllCategories, CreateCategory, GetCategoryBySlug, UpdateCategory, DeleteCategory };

``

