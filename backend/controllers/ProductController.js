const { ProductStatus, AllSize } = require('../Enum/Enum');
const ProductModel = require('../Models/Product');
const SubcategoryModel =require('../Models/SubCategory')
const CategoryModel =require('../Models/Category')
const fs = require('fs');  
const validateSizes = (sizeType, sizes) => {
    const validSizes = AllSize[sizeType];

    // Check if Sizes is provided and if it's an array
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
        // Sizes can be undefined (optional)
        return sizes === undefined;
    }
};

const CreateProduct = async (req, res) => {
    console.log("body",req.body);
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
        // Check if slug is unique
        const existingProduct = await ProductModel.findOne({ Slug });
        if (existingProduct) {
            return res.status(400).json({ message: 'Slug must be unique' });
        }

        // Validate SizeType
        if (!SizeType || !AllSize[SizeType]) {
            return res.status(400).json({ message: `Invalid SizeType: ${SizeType}` });
        }

        // Validate Sizes using the separate function
        if (!validateSizes(SizeType, Sizes)) {
            return res.status(400).json({ message: `Invalid Sizes for SizeType: ${SizeType}` });
        }

        // Create the product instance
        const newProduct = new ProductModel({
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
            Sizes: Sizes || [], // Default to empty array if not provided
            Status: ProductStatus.ACTIVE,
        });

        // This will trigger Mongoose validation
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
    const { slug } = req.params; // Get product slug from URL parameters
    const { Name, Description, Price, Quantity, CategoryId, SubcategoryId, Product_image, SKU, Brand, Tags ,SizeType, 
        Sizes } = req.body;
    
    try {
        // Find the product by slug
        const existingProduct = await ProductModel.findOne({ Slug: slug });
        if (!existingProduct) {
            return res.status(404).json({ message: 'Product not found' });
        }

        // Handle image upload if a new image is provided
        let uploadedImageUrl = existingProduct.Product_image; // Keep the existing image by default
        if (Product_image && Product_image !== existingProduct.Product_image) {
            try {
                const cloudinary = req.app.locals.cloudinary;

                // Delete the old image from Cloudinary if it exists
                if (existingProduct.Product_image) {
                    const public_id = existingProduct.Product_image.split('/').pop().split('.')[0];
                    await cloudinary.uploader.destroy(`products/${public_id}`);
                }

                // Upload the new image
                const result = await cloudinary.uploader.upload(Product_image, {
                    folder: 'products'
                });
                uploadedImageUrl = result.secure_url; // Update with the new uploaded image URL
            } catch (error) {
                console.log(error);
                return res.status(500).json({ message: 'Error uploading image to Cloudinary', error });
            }
        }
        if (SizeType && !AllSize[SizeType]) {
            return res.status(400).json({ message: `Invalid SizeType: ${SizeType}` });
        }

        // Validate Sizes based on SizeType
        const validSizes = AllSize[SizeType] 
            ? Array.isArray(AllSize[SizeType]) 
                ? AllSize[SizeType] // Direct array (e.g., Rings)
                : Object.values(AllSize[SizeType]).flat() // Nested structure (e.g., Shoes)
            : [];

        const invalidSizes = Sizes.filter(size => !validSizes.includes(size));
        if (invalidSizes.length > 0) {
            return res.status(400).json({ 
                message: `Invalid Sizes: ${invalidSizes.join(', ')}` 
            });
        }


        // Update product fields
        existingProduct.Name = Name;
        existingProduct.Description = Description;
        existingProduct.Price = Price;
        existingProduct.Quantity = Quantity;
        existingProduct.CategoryId = CategoryId;
        existingProduct.SubcategoryId = SubcategoryId;
        existingProduct.Product_image = uploadedImageUrl;
        existingProduct.SKU = SKU;
        existingProduct.Brand = Brand;
        existingProduct.Tags = Tags;
        existingProduct.SizeType=SizeType,
        existingProduct.Sizes=Sizes

        console.log("existingproduct",existingProduct)
        // Save the updated product
        const updatedProduct = await existingProduct.save();

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
        const Products = await ProductModel.find(); // Assuming you're not excluding any fields
console.log(Products)
        // If no categories are found, return a 404 response
        if (!Products || Products.length === 0) {
            return res.status(404).json({ message: 'No Products found' });
        }

        // Return the categories in the response with a 200 status
        return res.status(200).json(Products);
    } catch (err) {
        console.error("Error:", err);
        // Return a 500 status with an error message for any server-side error
        return res.status(500).json({ message: "Internal Server Error" });
    }
};

const GetProductBySlug = async (req, res) => {
    try {
        const { Slug } = req.params;  
        console.log("Received slug:", Slug); // Log the received slug
        
        // Perform case-insensitive search
        const Product = await ProductModel.findOne({ Slug: { $regex: new RegExp(Slug, "i") } });   
        
        console.log("Product found:", Product); // Log the result

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
    const { id } = req.params; // Get product ID from the request parameters

    try {
        // Find the product by ID
        const product = await ProductModel.findById(id);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        const cloudinary = req.app.locals.cloudinary;

        // Delete the product image from Cloudinary if it exists
        if (product.Product_image) {
            const public_id = product.Product_image.split('/').pop().split('.')[0]; // Extract the public ID
            await cloudinary.uploader.destroy(`products/${public_id}`); // Delete image from Cloudinary
        }

        // Delete the product from the database
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
   console.log("slug for all products",slug)
        // Try finding the slug in the Category table
        let category = await CategoryModel.findOne({ Slug: slug });

        if (category) {
            // If found in Category, fetch products by CategoryId
            const products = await ProductModel.find({ CategoryId: category._id });
            console.log("category Product",products)
            return res.json(products);
        }

        // If not found in Category, search in Subcategory
        const subcategory = await SubcategoryModel.findOne({ Slug: slug });

        if (subcategory) {
            // If found in Subcategory, fetch products by SubcategoryId
            const products = await ProductModel.find({ SubcategoryId: subcategory._id });
            console.log("products",products)
            return res.json(products);
        }

        // If neither found, return 404
        res.status(404).json({ message: 'Category or Subcategory not found' });

    } catch (error) {
        console.error('Error fetching products:', error);
        res.status(500).json({ message: 'Server error' });
    }
};


module.exports = { CreateProduct,UpdateProduct,GetAllProducts,GetProductBySlug ,DeleteProduct,GetAllProductsBySlug };

``

