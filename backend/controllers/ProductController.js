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

const UpdateProduct = async (req, res) => {
    const { slug } = req.params; // Get product slug from URL parameters
    const { Name, Description, Price, Quantity, CategoryId, SubcategoryId, Product_image, SKU, Brand, Tags } = req.body;
    
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


module.exports = { CreateProduct,UpdateProduct,GetAllProducts,GetProductBySlug ,DeleteProduct };

``

