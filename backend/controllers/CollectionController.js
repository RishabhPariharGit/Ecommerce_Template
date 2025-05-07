

const SubCategory = require('../Models/SubCategory')
const CollectionModel = require('../Models/Collections');
const ProductModel=require('../Models/Product')
const { GeneralStatus } = require('../Enum/Enum');
const fs = require('fs');  

const Createcollection = async (req, res) => {
    const { Name, Description, SubcategoryId, ProductId, Show_InHomepage,Show_InProductpage,Add_collections,Add_Products } = req.body;

    try {
        if (!req.user || !req.user._id) {
            return res.status(401).json({ message: 'Unauthorized: User not found' });
        }
       
       
        const newCollection = new CollectionModel({
            Name, 
            Description,
             SubcategoryId,
              ProductId, 
              Show_InHomepage,
              Show_InProductpage,
              Add_collections,
              Add_Products ,
            audit: {
                createdDate: new Date(),
                createdBy: req.user._id,  
                updatedDate: new Date(),
                updatedBy: req.user._id, 
                status: GeneralStatus.ACTIVE
            }
        });

        const savedSubcategory = await newCollection.save();

        res.status(201).json({
            message: 'Collection created successfully!',
            data: savedSubcategory
        });
    } catch (err) {
        res.status(500).json({ message: 'Error creating Collection', data: null, error: err });
    }
};

const GetAllCollections = async (req, res) => {
    try {
        const collections = await CollectionModel.find()
            .populate('SubcategoryId', 'Name')
            .populate('ProductId', 'Name product_image');

        if (!collections.length) {
            return res.status(404).json({ message: 'No collections found', data: [] });
        }

        res.status(200).json({
            message: 'Collections retrieved successfully',
            data: collections
        });
    } catch (err) {
        console.error("Error fetching collections:", err);
        res.status(500).json({ message: 'Error fetching collections', data: [], error: err });
    }
};


const GetCollectionById = async (req, res) => {
    try {
        const { Id } = req.params;
        const collection = await CollectionModel.findOne({ _id: Id});

        if (!collection) {
            return res.status(404).json({ message: 'collection not found', data: null });
        }

        return res.status(200).json({ message: 'collection retrieved successfully', data: collection });
    } catch (err) {
        console.error("Error:", err);
        return res.status(500).json({ message: "Internal Server Error", data: null, error: err });
    }
};


const UpdateCollection = async (req, res) => {
    const { Id } = req.params;
    const { Name, Description, SubcategoryId, ProductId, Show_InHomepage, Show_InProductpage, Add_collections, Add_Products } = req.body;

    try {
        if (!req.user || !req.user._id) {
            return res.status(401).json({ message: 'Unauthorized: User not found' });
        }

        // Find existing collection by Id
        const existingCollection = await CollectionModel.findById(Id);
        if (!existingCollection) {
            return res.status(404).json({ message: 'Collection not found', data: null });
        }

        // Update collection fields
        existingCollection.Name = Name;
        existingCollection.Description = Description;
        existingCollection.SubcategoryId = SubcategoryId;
        existingCollection.ProductId = ProductId;
        existingCollection.Show_InHomepage = Show_InHomepage;
        existingCollection.Show_InProductpage = Show_InProductpage;
        existingCollection.Add_collections = Add_collections;
        existingCollection.Add_Products = Add_Products;
        existingCollection.audit.updatedDate = new Date();
        existingCollection.audit.updatedBy = req.user._id;

        // Save the updated collection
        const updatedCollection = await existingCollection.save();

        res.status(200).json({
            message: 'Collection updated successfully!',
            data: updatedCollection
        });

    } catch (err) {
        console.error("Error updating collection:", err);
        res.status(500).json({ message: 'Error updating collection', data: null, error: err });
    }
};

const DeleteCollection = async (req, res) => {
    const { id } = req.params;

    try {
        const collection = await CollectionModel.findById(id);
        if (!collection) {
            return res.status(404).json({ message: 'Collection not found', data: null });
        }
        await CollectionModel.findByIdAndDelete(id);

        res.status(200).json({
            message: 'Collection and related products/images deleted successfully!',
            data: null
        });
    } catch (err) {
        console.error("Error deleting collection:", err);
        res.status(500).json({ message: 'Error deleting collection', data: null, error: err });
    }
};

const GetCollectionByName = async (req, res) => {
    try {
        const { Name } = req.body;

        const collections = await CollectionModel.find({
            Name,
            "audit.status": "Active"
        })
        .populate({
            path: 'SubcategoryId',
            select: 'Name Description label_image audit.status'
        })
        .populate({
            path: 'ProductId',
            select: 'Product_name Product_image price audit.status'
        });

        if (!collections || collections.length === 0) {
            return res.status(404).json({
                message: 'No collections found',
                data: []
            });
        }

        return res.status(200).json({
            message: "Successfully retrieved collections",
            data: collections
        });

    } catch (err) {
        console.error("Error retrieving collections:", err);
        return res.status(500).json({
            message: "Internal Server Error",
            data: []
        });
    }
};


module.exports = { Createcollection,GetAllCollections,GetCollectionById,
    UpdateCollection,DeleteCollection,GetCollectionByName};
