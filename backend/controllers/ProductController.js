const { ProductStatus } = require('../Enum/Enum');
const ProductModel = require('../Models/Product');
const fs = require('fs');  
const CreateProduct = async (req, res) => {
    console.log(req.body)
    const { Name, Description, Price, Quantity, CategoryId, SubcategoryId, Product_image, Slug, SKU,Brand, Tags } = req.body;

    try {
        const existingProduct = await ProductModel.findOne({ Slug });
        if (existingProduct) {
            return res.status(400).json({ message: 'Slug must be unique' });
        }

        let uploadedImageUrl = '';
        if (Product_image) {
            const filePath = Product_image;
            try {
                const cloudinary = req.app.locals.cloudinary;
                const result = await cloudinary.uploader.upload(filePath, {
                    folder: 'products'
                });
                uploadedImageUrl = result.secure_url;
            } catch (error) {
                return res.status(500).json({ message: 'Error uploading image to Cloudinary', error });
            }
        } else {
            return res.status(400).json({ message: 'Image file is required' });
        }

        // Create the new product with Status as "active"
        const newProduct = new ProductModel({
            Name,
            Description,
            Price,
            Quantity,
            CategoryId,
            SubcategoryId,
            Product_image: uploadedImageUrl,
            Slug,
            SKU,
            Tags,
            Brand,
            Status: ProductStatus.ACTIVE 
        });
console.log("newProduct",newProduct)
        const savedProduct = await newProduct.save();
        console.log("saveProduct",savedProduct)
        res.status(201).json({
            message: 'Product created successfully!',
            Product: savedProduct
        });
    } catch (err) {
        res.status(500).json({ message: 'Error creating Product', error: err });
    }
};






module.exports = { CreateProduct };

``

