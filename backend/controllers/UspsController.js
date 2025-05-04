
const UspsModel = require('../Models/Usps');
const fs = require('fs');
const { GeneralStatus } = require('../Enum/Enum');

const CreateUsps = async (req, res) => {
    const { MainHeading, SubHeading, IconBlocks } = req.body;
  
    if (!req.user || !req.user._id) {
      return res.status(401).json({ message: 'Unauthorized: User not found' });
    }
  
    try {
      const cloudinary = req.app.locals.cloudinary;
      const updatedIconBlocks = [];
  
      // Create a temporary Usps document to get the _id for folder naming
      const tempUsps = new UspsModel({
        MainHeading,
        SubHeading,
        IconBlocks: [],
        audit: {
          createdDate: new Date(),
          createdBy: req.user._id,
          updatedDate: new Date(),
          updatedBy: req.user._id,
          status: GeneralStatus.ACTIVE,
        },
      });
  
      const savedTempUsps = await tempUsps.save(); // Save to get the _id
  
      const folderName = `UspsIcons/Usps_${savedTempUsps._id}`; // Unique folder for this Usps
  
      // Process IconBlocks
      for (let i = 0; i < IconBlocks.length; i++) {
        const { icon_image, title, description } = IconBlocks[i];
  
        if (!icon_image) {
          return res.status(400).json({ message: `Missing image for icon block ${i}` });
        }
  
        if (icon_image.startsWith('data:image')) {
          const result = await cloudinary.uploader.upload(icon_image, {
            folder: folderName,
          });
  
          updatedIconBlocks.push({
            title,
            description,
            icon_image: result.secure_url,
          });
        } else {
          return res.status(400).json({ message: `Icon image for block ${i} is not valid base64 format.` });
        }
      }
  
      // Update IconBlocks in the existing document
      savedTempUsps.IconBlocks = updatedIconBlocks;
  
      const finalSavedUsps = await savedTempUsps.save();
  
      return res.status(201).json({
        message: 'Usps section created successfully!',
        data: finalSavedUsps,
      });
  
    } catch (err) {
      console.error("Error creating Usps section:", err);
      return res.status(500).json({
        message: 'Internal server error while creating Usps section.',
        error: err.message,
      });
    }
  };
  
  
  
  


const GetAllUsps = async (req, res) => {
    try {
        const Uspss = await UspsModel.find();
        if (!Uspss || Uspss.length === 0) {
            return res.status(404).json({ 
                message: 'No Uspss found', 
                data: [] // Ensure data is always present
            });
        }
        return res.status(200).json({
            message: "Successfully retrieved Uspss",
            data: Uspss
        });

    } catch (err) {
        console.error("Error:", err);
        return res.status(500).json({ 
            message: "Internal Server Error", 
            data: [] 
        });
    }
};

const GetUspsById = async (req, res) => {
    try {
        const { Id } = req.params;
        const Usps = await UspsModel.findById({ _id: Id });

        if (!Usps) {
            return res.status(404).json({ 
                message: 'Usps not found', 
                data: null 
            });
        }

        return res.status(200).json({
            message: "Successfully retrieved Usps",
            data: Usps
        });

    } catch (err) {
        console.error("Error:", err);
        return res.status(500).json({ 
            message: "Internal Server Error", 
            data: null 
        });
    }
};

const UpdateUsps = async (req, res) => {
    const { Id } = req.params;
    const { MainHeading, SubHeading, IconBlocks, Status } = req.body;
  
    try {
      if (!req.user || !req.user._id) {
        return res.status(401).json({ message: 'Unauthorized: User not found' });
      }
  
      const existingUsps = await UspsModel.findOne({ _id: Id });
      if (!existingUsps) {
        return res.status(404).json({ message: 'Usps section not found' });
      }
  
      const cloudinary = req.app.locals.cloudinary;
      const folderName = `UspsIcons/Usps_${Id}`;
  
      // Get all existing images from Cloudinary folder
      const { resources: existingImages } = await cloudinary.search
        .expression(`folder:${folderName}`)
        .execute();
  
      const existingImageUrls = existingImages.map(img => img.secure_url);
  
      const updatedIconBlocks = [];
  
      for (let i = 0; i < IconBlocks.length; i++) {
        const { icon_image, title, description } = IconBlocks[i];
        let finalIconImage = icon_image;
  
        if (!icon_image) {
          return res.status(400).json({ message: `Missing image for icon block ${i}` });
        }
  
        if (icon_image.startsWith('data:image')) {
          // New image to upload
          const result = await cloudinary.uploader.upload(icon_image, {
            folder: folderName,
          });
          finalIconImage = result.secure_url;
        }
  
        updatedIconBlocks.push({
          title,
          description,
          icon_image: finalIconImage,
        });
      }
  
      // Determine images to delete (those in Cloudinary but not in updatedIconBlocks)
      const updatedImageUrls = updatedIconBlocks.map(block => block.icon_image);
      const imagesToDelete = existingImages
        .filter(img => !updatedImageUrls.includes(img.secure_url))
        .map(img => img.public_id);
  
      if (imagesToDelete.length) {
        await cloudinary.api.delete_resources(imagesToDelete);
      }
  
      // Update fields
      existingUsps.MainHeading = MainHeading;
      existingUsps.SubHeading = SubHeading;
      existingUsps.IconBlocks = updatedIconBlocks;
      existingUsps.audit.status = Status;
      existingUsps.audit.updatedDate = new Date();
      existingUsps.audit.updatedBy = req.user._id;
  
      const updatedUsps = await existingUsps.save();
  
      return res.status(200).json({
        message: 'Usps section updated successfully!',
        data: updatedUsps,
      });
  
    } catch (err) {
      console.error("Error updating Usps:", err);
      return res.status(500).json({
        message: 'Internal server error while updating Usps section.',
        error: err.message,
      });
    }
  };
  
  
  
  
  
  

  const DeleteUsps = async (req, res) => {
    const { id } = req.params;
  
    try {
      const Usps = await UspsModel.findById(id);
      if (!Usps) {
        return res.status(404).json({
          message: 'Usps not found',
          data: null
        });
      }
  
      const cloudinary = req.app.locals.cloudinary;
      const folderName = `UspsIcons/Usps_${id}`;
  
      // 🔥 First delete all images in the folder
      await cloudinary.api.delete_resources_by_prefix(folderName);
  
      // 🔥 Then delete the folder itself (optional but clean)
      await cloudinary.api.delete_folder(folderName);
  
      // 🔥 Finally delete the Usps document from DB
      await UspsModel.findByIdAndDelete(id);
  
      return res.status(200).json({
        message: 'Usps and related images deleted successfully!',
        data: null
      });
  
    } catch (err) {
      console.error("Error deleting Usps:", err);
      return res.status(500).json({
        message: 'Error deleting Usps',
        data: null,
        error: err.message
      });
    }
  };
  
const GetAll_Active_Usps = async (req, res) => {
    try {
        const Uspss = await UspsModel.find({
            "audit.status": "Active"
        });
        
        if (!Uspss || Uspss.length === 0) {
            return res.status(404).json({ 
                message: 'No Uspss found', 
                data: [] // Ensure data is always present
            });
        }
        return res.status(200).json({
            message: "Successfully retrieved Uspss",
            data: Uspss
        });

    } catch (err) {
        console.error("Error:", err);
        return res.status(500).json({ 
            message: "Internal Server Error", 
            data: [] 
        });
    }
};

module.exports = { GetAllUsps, CreateUsps, GetUspsById, UpdateUsps, DeleteUsps, GetAll_Active_Usps };



