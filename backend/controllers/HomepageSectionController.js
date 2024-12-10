const HomepageSectionModel = require('../Models/HomepageSections ');
const ProductModel = require('../Models/Product');
const SubcategoryModel = require('../Models/SubCategory')
const CategoryModel = require('../Models/Category')
const mongoose = require('mongoose');

const AddSection = async (req, res) => {
    try {
        // Destructure data from the request body
        const { Title, SectionType, Items, DisplayOrder, Status } = req.body;

        // Validate required fields
        if (!Title || !SectionType || !DisplayOrder) {
            return res.status(400).json({ message: "Title, SectionType, and DisplayOrder are required." });
        }

        // Create a new HomepageSection document
        const newSection = new HomepageSectionModel({
            Title,
            SectionType,
            Items,
            DisplayOrder,
            Status
        });
        // Save the new section to the database
        const savedSection = await newSection.save();

        return res.status(201).json({ 
            message: "Homepage section added successfully.", 
            section: savedSection 
        });
    } catch (err) {
        console.error("Error:", err);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};

const GetAllSections = async (req, res) => {
    try {
        // Fetch all homepage sections from the database
        const homepageSections = await HomepageSectionModel.find();
        // Check if there are no sections
        if (!homepageSections || homepageSections.length === 0) {
            return res.status(404).json({ message: 'No homepage sections found.' });
        }
        // Return the sections as the response
        return res.status(200).json(homepageSections);
    } catch (err) {
        console.error("Error:", err);

        // Handle any unexpected errors
        return res.status(500).json({ message: "Internal Server Error" });
    }
};


const GetSectionById = async (req, res) => {
    try {
        const { id } = req.params;
        const Section = await HomepageSectionModel.findOne({ _id: id });
        console.log("Section",Section)
        if (!Section) {
            return res.status(404).json({ message: 'Section not found' });
        }
        return res.status(200).json(Section);
    } catch (err) {
        console.error("Error:", err);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};


const UpdateSection = async (req, res) => {
    const { id } = req.params;
    const { Title, SectionType, Items, DisplayOrder, Status } = req.body;
    try {
        const existingSection = await HomepageSectionModel.findOne({ _id: id });
        if (!existingSection) {
            return res.status(404).json({ message: 'Section not found' });
        }
        existingSection.Title = Title;
        existingSection.SectionType = SectionType;
        existingSection.Items = Items;
        existingSection.DisplayOrder = DisplayOrder;
        existingSection.Status = Status;
        const updatedProduct = await existingSection.save();
        res.status(200).json({
            message: 'Product updated successfully!',
            Product: updatedProduct
        });

    } catch (err) {
        console.error("Error updating product:", err);
        res.status(500).json({ message: 'Error updating product', error: err });
    }
};

const DeleteSection = async (req, res) => { 
    const { id } = req.params;
    try {
        const Section = await HomepageSectionModel.findById(id);
        if (!Section) {
            return res.status(404).json({ message: 'Section not found' });
        }
        await HomepageSectionModel.findByIdAndDelete(id);

        res.status(200).json({ message: 'Section deleted successfully!' });
    } catch (err) {
        console.error("Error deleting Section:", err);
        res.status(500).json({ message: 'Error deleting Section', error: err });
    }
};


const GetAllCollectionsforWebsite = async (req, res) => {
    try {
        // Fetch all sections
        const sections = await HomepageSectionModel.find();

        // Check if sections exist
        if (!sections || sections.length === 0) {
            return res.status(404).json({ message: 'No HomepageSections found' });
        }

        // Initialize an array to hold populated sections
        const populatedSections = [];

        // Loop through each section
        for (const section of sections) {
            let ItemsData = []; // Initialize ItemsData for each section

            // Get item IDs as ObjectId
            const itemIds = section.Items.map(id => new mongoose.Types.ObjectId(id));

            try {
                // Fetch data based on SectionType
                if (section.SectionType === 'Product') {
                    ItemsData = await ProductModel.find({ _id: { $in: itemIds } });
                    console.log("product",ItemsData)
                } else if (section.SectionType === 'Category') {
                    ItemsData = await CategoryModel.find({ _id: { $in: itemIds } });
                } else if (section.SectionType === 'Subcategory') {
                    ItemsData = await SubcategoryModel.find({ _id: { $in: itemIds } });
                }
            } catch (err) {
                console.error(`Error fetching data for section ${section.Title}:`, err);
            }

            // Add the populated section to the result array
            populatedSections.push({
                ...section.toObject(),
                ItemsData, // Attach the section-specific ItemsData
            });
        }

        // Respond with populated sections
        return res.status(200).json(populatedSections);
    } catch (err) {
        console.error('Error in GetAllCollectionsforWebsite:', err);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
};









module.exports = { AddSection,GetAllSections,GetSectionById ,UpdateSection,DeleteSection,GetAllCollectionsforWebsite};
