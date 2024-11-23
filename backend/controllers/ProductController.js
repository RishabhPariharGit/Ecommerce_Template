const { ProductStatus, AllSize } = require('../Enum/Enum');
const ProductModel = require('../Models/Product');
const SubcategoryModel = require('../Models/SubCategory')
const CategoryModel = require('../Models/Category')
const CartItemModel = require('../Models/CartItems'); 
const WishlistItemModel = require('../Models/Wishlist ');
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
        Product_Main_image,
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
        const imageUploadPromises = Product_image.map((image) => {
            return cloudinary.uploader.upload(image, { folder: 'products' });
        });
        const uploadResults = await Promise.all(imageUploadPromises);
        const imageUrls = uploadResults.map(result => result.secure_url);
        //upload single main image

        let uploadedImageUrl = '';
        if (Product_Main_image) {
            const filePath = Product_Main_image;
            try {
                const result = await cloudinary.uploader.upload(filePath, {
                    folder: 'products'
                })
                uploadedImageUrl = result.secure_url;

            } catch (error) {
                console.log(error)
                return res.status(500).json({ message: 'Error uploading image to Cloudinary', error });
            }
        } else {
            return res.status(400).json({ message: 'Image file is required' });
        }

        const newProduct = new ProductModel({
            Name,
            Description,
            Price,
            Quantity,
            CategoryId,
            SubcategoryId,
            Product_image: imageUrls,
            Product_Main_image: uploadedImageUrl,
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
    const { Name, Description, Price, Quantity, CategoryId, SubcategoryId, Product_image,Product_Main_image, SKU, Brand, Tags, SizeType, Sizes } = req.body;

    try {
        // Find existing product
        const existingProduct = await ProductModel.findOne({ Slug: slug });
        if (!existingProduct) {
            return res.status(404).json({ message: 'Product not found' });
        }

        const cloudinary = req.app.locals.cloudinary;

        // Step 1: Prepare to remove images not in new Product_image array
        const existingImageUrls = existingProduct.Product_image || [];
        const newImageUrls = Product_image || []; // New images from frontend

        // Extract public IDs of existing images and delete if not in new images
        const existingPublicIds = existingImageUrls.map(url => {
            const parts = url.split('/');
            return parts[parts.length - 2] + '/' + parts[parts.length - 1].split('.')[0];
        });

        const newPublicIds = newImageUrls.map(url => {
            const parts = url.split('/');
            return parts[parts.length - 2] + '/' + parts[parts.length - 1].split('.')[0];
        });

        const deletePromises = existingPublicIds
            .filter(publicId => !newPublicIds.includes(publicId))
            .map(publicId => cloudinary.uploader.destroy(publicId));

        await Promise.all(deletePromises);

        // Step 2: Upload new images that aren’t URLs in Cloudinary
        const updatedImageUrls = await Promise.all(newImageUrls.map(async (imageUrl) => {
            if (imageUrl.startsWith('http')) {
                return imageUrl; // URL already uploaded to Cloudinary
            } else {
                const uploadResult = await cloudinary.uploader.upload(imageUrl, { folder: 'products', resource_type: 'auto' });
                return uploadResult.secure_url; // Newly uploaded image URL
            }
        }));

        //update Single image of Product
        let uploadedImageUrl = existingProduct.Product_Main_image;
        if (Product_Main_image && Product_Main_image !== existingProduct.Product_Main_image) {
            try {
                const cloudinary = req.app.locals.cloudinary;
                if (existingProduct.Product_Main_image) {
                    const public_id = existingProduct.Product_Main_image.split('/').pop().split('.')[0];
                    await cloudinary.uploader.destroy(`products/${public_id}`);
                }
                const result = await cloudinary.uploader.upload(Product_Main_image, {
                    folder: 'products'
                });
                uploadedImageUrl = result.secure_url;
            } catch (error) {
                console.log(error);
                return res.status(500).json({ message: 'Error uploading image to Cloudinary', error });
            }
        }

        // Step 3: Update product fields
        existingProduct.Name = Name;
        existingProduct.Description = Description;
        existingProduct.Price = Price;
        existingProduct.Quantity = Quantity;
        existingProduct.CategoryId = CategoryId;
        existingProduct.SubcategoryId = SubcategoryId;
        existingProduct.Product_image = updatedImageUrls; 
        existingProduct.Product_Main_image = uploadedImageUrl; 
        existingProduct.SKU = SKU;
        existingProduct.Brand = Brand;
        existingProduct.Tags = Tags;
        existingProduct.SizeType = SizeType;
        existingProduct.Sizes = Sizes;

        // Step 4: Save updated product
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
        console.log("Product",Product)
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
    const session = await ProductModel.startSession(); // Start a new session for the transaction
    session.startTransaction();

    try {
        const product = await ProductModel.findById(id).session(session); // Include session in the find query

        if (!product) {
            await session.abortTransaction();
            session.endSession();
            return res.status(404).json({ message: 'Product not found' });
        }

        const cloudinary = req.app.locals.cloudinary;
        
        // Delete images from Cloudinary
        if (Array.isArray(product.Product_image)) {
            const deletePromises = product.Product_image.map((imageUrl) => {
                const public_id = imageUrl.split('/').pop().split('.')[0];
                return cloudinary.uploader.destroy(`products/${public_id}`);
            });
            await Promise.all(deletePromises);
        }

        // Cascade delete associated CartItems and WishlistItems
        await CartItemModel.deleteMany({ ProductId: id }).session(session);
        await WishlistItemModel.deleteMany({ ProductId: id }).session(session);

        // Finally, delete the product itself
        await ProductModel.findByIdAndDelete(id).session(session);

        // Commit the transaction
        await session.commitTransaction();
        session.endSession();

        res.status(200).json({ message: 'Product and associated items deleted successfully!' });
    } catch (err) {
        await session.abortTransaction();
        session.endSession();

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


module.exports = { CreateProduct, UpdateProduct, GetAllProducts, GetProductBySlug, DeleteProduct, GetAllProductsBySlug };

``

