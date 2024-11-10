const { ProductStatus, AllSize } = require('../Enum/Enum');
const ProductModel = require('../Models/Product');
const SubcategoryModel =require('../Models/SubCategory')
const CategoryModel =require('../Models/Category')
const fs = require('fs');  

const validateSizes = (sizeType, sizes) => {
    const validSizes = AllSize[sizeType];
    if (sizes && Array.isArray(sizes)) {
        switch (sizeType) {
            case 'Clothing':
                return sizes.every(size => Object.values(validSizes).includes(size));
            case 'Shoes':
                return sizes.every(size => Object.values(validSizes).includes(size));
                
            case 'Pants':
                return sizes.every(size => validSizes.Waist.includes(size));
            case 'Dresses':
                return sizes.every(size => validSizes.Standard.includes(size) || validSizes.Numeric.includes(size));
            case 'Accessories':
                return sizes.every(size => validSizes.Belts.includes(size) || validSizes.Hats.includes(size));
            case 'Rings':
                return sizes.every(size => validSizes.includes(size));
            case 'Gloves':
                return sizes.every(size => validSizes.includes(size));
            case 'Bras':
                return sizes.every(size => validSizes.Band.includes(size) || validSizes.Cup.includes(size));
            case 'KidsClothing':
                return sizes.every(size =>
                    validSizes.Baby.includes(size) ||
                    validSizes.Toddler.includes(size) ||
                    validSizes.Kids.includes(size)
                );
            default:
                return false; // Invalid SizeType
        }
    } else {
        return sizes === undefined;
    }
};

const CreateProduct = async (req, res) => {
    const { 
        Name, 
        Description, 
        Price, 
        Quantity, 
        CategoryId, 
        SubcategoryId, 
        Product_image, 
        Slug, 
        SKU, 
        Brand, 
        Tags, 
        SizeType, 
        Sizes 
    } = req.body;

    try {
        const existingProduct = await ProductModel.findOne({ Slug });
        if (existingProduct) {
            return res.status(400).json({ message: 'Slug must be unique' });
        }

        if (!SizeType || !AllSize[SizeType]) {
            return res.status(400).json({ message: `Invalid SizeType: ${SizeType}` });
        }

        if (!validateSizes(SizeType, Sizes)) {
            return res.status(400).json({ message: `Invalid Sizes for SizeType: ${SizeType}` });
        }
        if (!Array.isArray(Product_image) || Product_image.length === 0) {
            return res.status(400).json({ message: 'Product_image must be a non-empty array of images.' });
        }
        const cloudinary = req.app.locals.cloudinary;
        console.log("Image URLs to upload:", Product_image);
        const imageUploadPromises = Product_image.map((image) => {
            return cloudinary.uploader.upload(image, { folder: 'products' });
        });
        
        const uploadResults = await Promise.all(imageUploadPromises);
        const imageUrls = uploadResults.map(result => result.secure_url);
console.log("imageurl",imageUrls)
        const newProduct = new ProductModel({
            Name,
            Description,
            Price,
            Quantity,
            CategoryId,
            SubcategoryId,
            Product_image: imageUrls, // Store image URLs as array
            Slug,
            SKU,
            Brand,
            Tags,
            SizeType,
            Sizes: Sizes || [],
            Status: ProductStatus.ACTIVE,
        });

        const savedProduct = await newProduct.save();

        res.status(201).json({
            message: 'Product created successfully!',
            Product: savedProduct,
        });
    } catch (err) {
        console.error("Error creating Product:", err);
        res.status(500).json({ message: 'Error creating Product', error: err });
    }
};

const UpdateProduct = async (req, res) => {
    const { slug } = req.params;
    const { Name, Description, Price, Quantity, CategoryId, SubcategoryId, Product_image, SKU, Brand, Tags, SizeType, Sizes } = req.body;

    try {
        // Find existing product
        const existingProduct = await ProductModel.findOne({ Slug: slug });
        if (!existingProduct) {
            return res.status(404).json({ message: 'Product not found' });
        }

        const cloudinary = req.app.locals.cloudinary;

        // Delete old images from Cloudinary if they exist
        if (Array.isArray(existingProduct.Product_image)) {
            const deletePromises = existingProduct.Product_image.map((imageUrl) => {
                const public_id = imageUrl.split('/').pop().split('.')[0];
                console.log("Deleting image with public ID:", public_id);
                return cloudinary.uploader.destroy(`products/${public_id}`);
            });

            const deleteResponses = await Promise.all(deletePromises);
            console.log("Deleted images response:", deleteResponses);
        }

        // Upload new images if provided
        let updatedImageUrls = [];
        if (Array.isArray(Product_image) && Product_image.length > 0) {
            console.log("Uploading new images:", Product_image);

            // Upload each image to Cloudinary
            // const imageUploadPromises = Product_image.map((image) => {
            //     return cloudinary.uploader.upload(image, { folder: 'products' });
            // });
            const imageUploadPromises = Product_image.map((imageUrl) => {
                const public_id = imageUrl.split('/').pop();
                const url="image/"+public_id;
                console.log("url",url)
                return cloudinary.uploader.upload(url, { folder: 'products' });
            });

            const uploadResults = await Promise.all(imageUploadPromises);
            console.log("Image upload results:", uploadResults);

            // Filter out successful uploads
            updatedImageUrls = uploadResults
                .filter(result => result.result === 'ok')  // Only include successful uploads
                .map(result => result.secure_url);  // Extract the URL of each uploaded image

            // Log failed uploads
            uploadResults.forEach(result => {
                if (result.result !== 'ok') {
                    console.error("Failed to upload image:", result);
                }
            });
        }

        // Update the product fields with new values
        existingProduct.Name = Name;
        existingProduct.Description = Description;
        existingProduct.Price = Price;
        existingProduct.Quantity = Quantity;
        existingProduct.CategoryId = CategoryId;
        existingProduct.SubcategoryId = SubcategoryId;
        existingProduct.Product_image = updatedImageUrls.length > 0 ? updatedImageUrls : existingProduct.Product_image;  // If no new images, keep old ones
        existingProduct.SKU = SKU;
        existingProduct.Brand = Brand;
        existingProduct.Tags = Tags;
        existingProduct.SizeType = SizeType;
        existingProduct.Sizes = Sizes;

        // Save the updated product
        const updatedProduct = await existingProduct.save();

        // Send response
        res.status(200).json({
            message: 'Product updated successfully!',
            Product: updatedProduct
        });
    } catch (err) {
        console.error("Error updating product:", err);
        res.status(500).json({ message: 'Error updating product', error: err });
    }
};




const GetAllProducts = async (req, res) => {
    try {
        const Products = await ProductModel.find(); 
        if (!Products || Products.length === 0) {
            return res.status(404).json({ message: 'No Products found' });
        }      
        return res.status(200).json(Products);
    } catch (err) {
        console.error("Error:", err);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};

const GetProductBySlug = async (req, res) => {
    try {
        const { Slug } = req.params;
        const Product = await ProductModel.findOne({ Slug: { $regex: new RegExp(Slug, "i") } }); 
        if (!Product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        return res.status(200).json(Product);
    } catch (err) {
        console.error("Error:", err);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};

const DeleteProduct = async (req, res) => {
    const { id } = req.params;
    try {
        const product = await ProductModel.findById(id);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        const cloudinary = req.app.locals.cloudinary;
        if (Array.isArray(product.Product_image)) {
            const deletePromises = product.Product_image.map((imageUrl) => {
                const public_id = imageUrl.split('/').pop().split('.')[0];
                return cloudinary.uploader.destroy(`products/${public_id}`);
            });
            await Promise.all(deletePromises);
        }
        await ProductModel.findByIdAndDelete(id);

        res.status(200).json({ message: 'Product deleted successfully!' });
    } catch (err) {
        console.error("Error deleting product:", err);
        res.status(500).json({ message: 'Error deleting product', error: err });
    }
};


const GetAllProductsBySlug = async (req, res) => {
    try {
        const { slug } = req.params;
        let category = await CategoryModel.findOne({ Slug: slug });

        if (category) {       
            const products = await ProductModel.find({ CategoryId: category._id });
            return res.json(products);
        }
        const subcategory = await SubcategoryModel.findOne({ Slug: slug });

        if (subcategory) {
            const products = await ProductModel.find({ SubcategoryId: subcategory._id });
            return res.json(products);
        }
        res.status(404).json({ message: 'Category or Subcategory not found' });

    } catch (error) {
        console.error('Error fetching products:', error);
        res.status(500).json({ message: 'Server error' });
    }
};


module.exports = { CreateProduct,UpdateProduct,GetAllProducts,GetProductBySlug ,DeleteProduct,GetAllProductsBySlug };

``

