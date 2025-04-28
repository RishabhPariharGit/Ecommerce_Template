const SubCategory = require('../Models/SubCategory')
const SubCategoryModel = require('../Models/SubCategory');
const CategoryModel = require('../Models/Category');
const ProductModel=require('../Models/Product')
const { GeneralStatus } = require('../Enum/Enum');
const fs = require('fs');  

const CreateSubcategory = async (req, res) => {
    const { Name, Description, Slug, label_image, CategoryId,Show_In_Colletion_Grid,ISLandscape } = req.body;

    try {
        if (!req.user || !req.user._id) {
            return res.status(401).json({ message: 'Unauthorized: User not found' });
        }
        if (!Array.isArray(CategoryId) || CategoryId.length === 0) {
            return res.status(400).json({ message: 'At least one CategoryId is required', data: null });
        }
        const existingSubcategory = await SubCategory.findOne({ Slug });
        if (existingSubcategory) {
            return res.status(400).json({ message: 'Slug must be unique', data: null });
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
                console.log(error);
                return res.status(500).json({ message: 'Error uploading image to Cloudinary', data: null, error });
            }
        } else {
            return res.status(400).json({ message: 'Image file is required', data: null });
        }

        const newSubcategory = new SubCategory({
            Name,
            Description,
            label_image: uploadedImageUrl,
            Slug,
            CategoryId,
            Show_In_Colletion_Grid,
            ISLandscape,
            audit: {
                createdDate: new Date(),
                createdBy: req.user._id,  
                updatedDate: new Date(),
                updatedBy: req.user._id, 
                status: GeneralStatus.ACTIVE
            }
        });

        const savedSubcategory = await newSubcategory.save();

        res.status(201).json({
            message: 'Subcategory created successfully!',
            data: savedSubcategory
        });
    } catch (err) {
        res.status(500).json({ message: 'Error creating Subcategory', data: null, error: err });
    }
};



const GetAllSubCategories = async (req, res) => {
    try {
       
        const subcategories = await SubCategory.find()
          .populate('CategoryId', 'Name'); 
        
        if (!subcategories || subcategories.length === 0) {
          return res.status(404).json({ message: 'No subcategories found', data: null });
        }
    
        return res.status(200).json({
          message: "Successfully retrieved subcategories with category information",
          data: subcategories
        });
      } catch (err) {
        console.error("Error:", err);
        return res.status(500).json({ message: "Internal Server Error", data: null, error: err });
      }
};



const GetAllSubCategoriesByCategoryId = async (req, res) => {
    try {
        const { CategoryId } = req.body; 
        const subcategories = await SubCategory.find({ CategoryId,"audit.status": "Active" });

        if (!subcategories || subcategories.length === 0) {
            return res.status(404).json({ message: 'No subcategories found', data: null });
        }

        return res.status(200).json({ message: 'Subcategories retrieved successfully', data: subcategories });
    } catch (err) {
        console.error("Error:", err);
        return res.status(500).json({ message: "Internal Server Error", data: null, error: err });
    }
};


const GetAllSubCategoriesByCategorySlug = async (req, res) => {
    try {
        const { Slug } = req.body; 

        const category = await CategoryModel.findOne({ Slug });
        if(category){
            const subcategories = await SubCategory.find({CategoryId: category._id,"audit.status": "Active" });
            if (!subcategories || subcategories.length === 0) { 
                return res.status(404).json({ message: 'No subcategories found', data: null });
            }else{
                return res.status(200).json({ message: 'Subcategories retrieved successfully', data: subcategories });
            }
        }else{
            return res.status(404).json({ message: 'No Category  found', data: null });
        }
    } catch (err) {
        console.error("Error:", err);
        return res.status(500).json({ message: "Internal Server Error", data: null, error: err });
    }
};

const GetSubCategoryBySlug = async (req, res) => {
    try {
        const { Slug } = req.params;
        const subcategory = await SubCategoryModel.findOne({ Slug: { $regex: new RegExp(Slug, 'i') } });

        if (!subcategory) {
            return res.status(404).json({ message: 'Subcategory not found', data: null });
        }

        return res.status(200).json({ message: 'Subcategory retrieved successfully', data: subcategory });
    } catch (err) {
        console.error("Error:", err);
        return res.status(500).json({ message: "Internal Server Error", data: null, error: err });
    }
};


const UpdateSubCategory = async (req, res) => {
    const { slug } = req.params;
    const { Name, Description, label_image, CategoryId, Status ,Show_In_Colletion_Grid,ISLandscape} = req.body;

    try {
        if (!req.user || !req.user._id) {
            return res.status(401).json({ message: 'Unauthorized: User not found' });
        } 
        const existingSubCategory = await SubCategory.findOne({ Slug: slug });
        if (!existingSubCategory) {
            return res.status(404).json({ message: 'Subcategory not found', data: null });
        }

        let uploadedImageUrl = existingSubCategory.label_image;

        if (label_image && label_image !== existingSubCategory.label_image) {
            try {
                const cloudinary = req.app.locals.cloudinary;
                if (existingSubCategory.label_image) {
                    const public_id = existingSubCategory.label_image.split('/').pop().split('.')[0];
                    await cloudinary.uploader.destroy(`subcategories/${public_id}`);
                }
                const result = await cloudinary.uploader.upload(label_image, {
                    folder: 'subcategories'
                });
                uploadedImageUrl = result.secure_url;
            } catch (error) {
                console.error("Cloudinary Upload Error:", error);
                return res.status(500).json({ message: 'Error uploading image to Cloudinary', data: null, error });
            }
        }

        // Update subcategory fields
        existingSubCategory.Name = Name;
        existingSubCategory.Description = Description;
        existingSubCategory.label_image = uploadedImageUrl;
        existingSubCategory.CategoryId = CategoryId;
        existingSubCategory.audit.status = Status;
        existingSubCategory.Show_In_Colletion_Grid  =Show_In_Colletion_Grid;
        existingSubCategory.ISLandscape  =ISLandscape;
        existingSubCategory.audit.updatedDate = new Date();
        existingSubCategory.audit.updatedBy = req.user._id;

        // Save the updated subcategory
        const updatedSubCategory = await existingSubCategory.save();

        res.status(200).json({
            message: 'Subcategory updated successfully!',
            data: updatedSubCategory
        });
    } catch (err) {
        console.error("Error:", err);
        res.status(500).json({ message: 'Error updating subcategory', data: null, error: err });
    }
};


const DeleteSubCategory = async (req, res) => {
    const { id } = req.params;

    try {
        const subcategory = await SubCategoryModel.findById(id);
        if (!subcategory) {
            return res.status(404).json({ message: 'Subcategory not found', data: null });
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

        res.status(200).json({
            message: 'Subcategory and related products with images deleted successfully!',
            data: null
        });
    } catch (err) {
        console.error("Error deleting subcategory:", err);
        res.status(500).json({ message: 'Error deleting subcategory', data: null, error: err });
    }
};


const   GetAll_Active_subCategories = async (req, res) => {
    try {
        const subcategories = await SubCategory.find({"audit.status": "Active"});
        if (!subcategories || subcategories.length === 0) {
            return res.status(404).json({ 
                message: 'No categories found', 
                data: [] // Ensure data is always present
            });
        }

       

        return res.status(200).json({
            message: "Successfully retrieved categories",
            data: subcategories
        });

    } catch (err) {
        console.error("Error:", err);
        return res.status(500).json({ 
            message: "Internal Server Error", 
            data: [] 
        });
    }
};


module.exports = { CreateSubcategory,GetAllSubCategories,GetAllSubCategoriesByCategoryId,
    GetSubCategoryBySlug,UpdateSubCategory,DeleteSubCategory,GetAll_Active_subCategories ,GetAllSubCategoriesByCategorySlug};
