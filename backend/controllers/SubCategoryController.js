const SubCategory = require('../Models/SubCategory')
const SubCategoryModel = require('../Models/SubCategory');
const ProductModel=require('../Models/Product')
const { GeneralStatus } = require('../Enum/Enum');
const fs = require('fs');  

const CreateSubcategory = async (req, res) => {
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
            CategoryId,
            Status: GeneralStatus.ACTIVE,
        });
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

const GetSubCategoryBySlug = async (req, res) => {
    try {
        const { Slug } = req.params;
        const category = await SubCategoryModel.findOne({ Slug: { $regex: new RegExp(Slug, 'i') } });       
        if (!category) {
            return res.status(404).json({ message: 'Category not found' });
        }
        return res.status(200).json(category);
    } catch (err) {
        console.error("Error:", err);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};

const UpdateSubCategory = async (req, res) => {
    const { slug } = req.params;
    const { Name, Description, label_image, CategoryId,Status } = req.body;

    try {
        const existingsubCategory = await SubCategory.findOne({ Slug: slug });
        if (!existingsubCategory) {
            return res.status(404).json({ message: 'Subcategory not found' });
        }
        let uploadedImageUrl = existingsubCategory.label_image;
        if (label_image && label_image !== existingsubCategory.label_image) {
            try {
                const cloudinary = req.app.locals.cloudinary;
                if (existingsubCategory.label_image) {
                    const public_id = existingsubCategory.label_image.split('/').pop().split('.')[0];
                    await cloudinary.uploader.destroy(`subcategories/${public_id}`);
                }
                const result = await cloudinary.uploader.upload(label_image, {
                    folder: 'subcategories'
                });
                uploadedImageUrl = result.secure_url;
            } catch (error) {
                console.log(error);
                return res.status(500).json({ message: 'Error uploading image to Cloudinary', error });
            }
        }

        // Update subcategory fields
        existingsubCategory.Name = Name;
        existingsubCategory.Description = Description;
        existingsubCategory.label_image = uploadedImageUrl;
        existingsubCategory.CategoryId = CategoryId;
        existingsubCategory.Status = Status;


        // Save the updated subcategory
        const updatedSubCategory = await existingsubCategory.save();

        res.status(200).json({
            message: 'Subcategory updated successfully!',
            subCategory: updatedSubCategory
        });
    } catch (err) {
        console.error("Error:", err);
        res.status(500).json({ message: 'Error updating subcategory', error: err });
    }
};

const DeleteSubCategory = async (req, res) => {
    const { id } = req.params;

    try {
        const subcategory = await SubCategoryModel.findById(id);
        if (!subcategory) {
            return res.status(404).json({ message: 'Subcategory not found' });
        }
        const cloudinary = req.app.locals.cloudinary;
        const products = await ProductModel.find({ SubcategoryId: subcategory._id }); 

        for (const product of products) {
            if (product.Product_image) {
                const public_id = product.Product_image.split('/').pop().split('.')[0];
                await cloudinary.uploader.destroy(`products/${public_id}`); 
            }
        }
        await ProductModel.deleteMany({ SubcategoryId: subcategory._id });

        if (subcategory.label_image) {
            const public_id = subcategory.label_image.split('/').pop().split('.')[0];
            await cloudinary.uploader.destroy(`subcategories/${public_id}`);
        }
        await SubCategoryModel.findByIdAndDelete(id);

        res.status(200).json({ message: 'Subcategory and related products and their images deleted successfully!' });
    } catch (err) {
        console.error("Error deleting subcategory:", err);
        res.status(500).json({ message: 'Error deleting subcategory', error: err });
    }
};


module.exports = { CreateSubcategory,GetAllSubCategories,GetAllSubCategoriesByCategoryId,GetSubCategoryBySlug,UpdateSubCategory,DeleteSubCategory };
