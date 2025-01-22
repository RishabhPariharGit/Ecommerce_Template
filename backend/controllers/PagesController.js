const PagesModel=require('../Models/Pages')
const { GeneralStatus } = require('../Enum/Enum');


const CreatePage = async (req, res) => {
    const {
        Title,
        Content,
        Images,
        Visibility,
        Visibility_date,
        TemplateId
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
            TemplateId,
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

const GetPageBySlug = async (req, res) => {
    try {
        const { Slug } = req.params;
        const Page = await PagesModel.findOne({ Slug: { $regex: new RegExp(Slug, "i") } });
        console.log("Page",Page)
        if (!Page) {
            return res.status(404).json({ message: 'Page not found' });
        }

        return res.status(200).json(Page);
    } catch (err) {
        console.error("Error:", err);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};


const UpdatePage = async (req, res) => {
    try {
        const { slug } = req.params;
        const {
            Title,
            Content,
            Images,
            Visibility,
            Visibility_date,
            TemplateId
        } = req.body;

        // Find the existing page by slug (case-insensitive)
        const existingPage = await PagesModel.findOne({ Slug: { $regex: new RegExp(slug, "i") } });
        if (!existingPage) {
            return res.status(404).json({ message: 'Page not found' });
        }

        // Update the page fields
        existingPage.Title = Title || existingPage.Title;
        existingPage.Content = Content || existingPage.Content;
        existingPage.Images = Images || existingPage.Images;
        existingPage.Visibility = Visibility || existingPage.Visibility;
        existingPage.Visibility_date = Visibility_date 
            ? new Date(Visibility_date).toISOString().split("T")[0] 
            : existingPage.Visibility_date;
        existingPage.TemplateId = TemplateId || existingPage.TemplateId;

        // Save the updated page
        const updatedPage = await existingPage.save();
        if (!updatedPage) {
            return res.status(500).json({ message: 'Failed to update the page.' });
        }
        // If no template is associated, just update the page
        return res.status(200).json({
            message: 'Page updated successfully.',
            page: updatedPage,
        });
    } catch (error) {
        console.error('Error updating page:', error);
        res.status(500).json({ message: 'Internal server error.' });
    }
};

const DeletePage = async (req, res) => { 
    const { id } = req.params;
    try {
        const Page = await PagesModel.findById(id);
        if (!Page) {
            return res.status(404).json({ message: 'Page not found' });
        }
        await PagesModel.findByIdAndDelete(id);

        res.status(200).json({ message: 'Page deleted successfully!' });
    } catch (err) {
        console.error("Error deleting Page:", err);
        res.status(500).json({ message: 'Error deleting Page', error: err });
    }
};

module.exports = { CreatePage,GetAllPages,GetPageBySlug,UpdatePage,DeletePage };
