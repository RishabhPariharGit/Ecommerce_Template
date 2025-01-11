const PagesModel=require('../Models/Pages')
const { GeneralStatus } = require('../Enum/Enum');


const CreatePage = async (req, res) => {
    const {
        Title,
        Content,
        Images,
        Visibility,
        Visibility_date,
    } = req.body;

    try {
        // Upload Images (if provided)
        let uploadedImages = [];
        if (Images && Array.isArray(Images) && Images.length > 0) {
            const cloudinary = req.app.locals.cloudinary;

            try {
                const uploadPromises = Images.map((image) =>
                    cloudinary.uploader.upload(image, { folder: 'pages' })
                );

                const uploadResults = await Promise.all(uploadPromises);
                uploadedImages = uploadResults.map((result) => result.secure_url);
            } catch (error) {
                console.error("Error uploading images to Cloudinary:", error);
                return res.status(500).json({ message: 'Error uploading images', error });
            }
        }

        // Ensure Title is provided
        if (!Title || Title.trim() === '') {
            return res.status(400).json({ message: 'Title is required' });
        }

        // Generate a unique slug
        let baseSlug = Title
            .replace(/([a-zA-Z])([0-9])/g, '$1-$2') // Add hyphen between letters and numbers
            .replace(/[^a-zA-Z0-9]+/g, '-')         // Replace non-alphanumeric characters with hyphen
            .replace(/^-|-$/g, '');                 // Remove leading/trailing hyphens

        let slug = baseSlug;
        let counter = 1;

        while (true) {
            const existingPage = await PagesModel.findOne({ Slug: slug });
            if (!existingPage) {
                break; // No duplicate found, exit loop
            }
            slug = `${baseSlug}-${counter}`;
            counter++;
        }

        // Create new Page instance
        const newPage = new PagesModel({
            Title,
            Slug: slug,
            Url: `http://localhost:3000/pages/${slug}`,
            Content,
            Images: uploadedImages,
            Visibility,
            Visibility_date: Visibility_date || null,
            Status: GeneralStatus.ACTIVE,
        });

        // Save the Page
        const savedPage = await newPage.save();

        res.status(201).json({
            message: 'Page created successfully!',
            Page: savedPage,
        });
    } catch (err) {
        console.error("Error creating Page:", err);
        res.status(500).json({ message: 'Error creating Page', error: err });
    }
};




const GetAllPages = async (req, res) => {
    try {
        const Pages = await PagesModel.find();
        if (!Pages || Pages.length === 0) {
            return res.status(404).json({ message: 'No Pages found' });
        }
        return res.status(200).json(Pages);
    } catch (err) {
        console.error("Error:", err);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};




module.exports = { CreatePage,GetAllPages };
