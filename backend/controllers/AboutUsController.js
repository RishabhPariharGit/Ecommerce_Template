const AboutUsModel = require('../Models/AboutUs');


const CreateAboutUs = async (req, res) => {
    const { pageTitle, pageDescription, sections } = req.body;
  
    if (!req.user || !req.user._id) {
      return res.status(401).json({ message: 'Unauthorized: User not found' });
    }
  
    try {
      const cloudinary = req.app.locals.cloudinary;
      const updatedsections = [];
  
      // Create a temporary Usps document to get the _id for folder naming
      const tempAboutUs = new AboutUsModel({
        pageTitle,
        pageDescription,
        sections: [],
        audit: {
          createdDate: new Date(),
          createdBy: req.user._id,
          updatedDate: new Date(),
          updatedBy: req.user._id,
          status: GeneralStatus.ACTIVE,
        },
      });
  
      const savedTempAboutUs = await tempAboutUs.save(); // Save to get the _id
  
      const folderName = `AboutUsImages/AboutUs_${savedTempAboutUs._id}`; // Unique folder for this Usps
  
      // Process IconBlocks
      for (let i = 0; i < sections.length; i++) {
        const { type, title, subtitle,content,image,images, buttonText,buttonLink,order,teamMembers} = sections[i];
  
        if (!image) {
          return res.status(400).json({ message: `Missing image for section block${i}` });
        }
  
        if (image.startsWith('data:image')) {
          const result = await cloudinary.uploader.upload(image, {
            folder: folderName,
          });
  
          updatedsections.push({
            type,
            title, 
            subtitle,
            content,
            images, 
            buttonText,
            buttonLink,
            order,
            teamMembers,
            image: result.secure_url,
          });
        } else {
          return res.status(400).json({ message: `image for block ${i} is not valid base64 format.` });
        }
      }
  
      // Update IconBlocks in the existing document
      savedTempAboutUs.sections = updatedsections;
  
      const finalSavedSections = await savedTempAboutUs.save();
  
      return res.status(201).json({
        message: 'About Us section created successfully!',
        data: finalSavedSections,
      });
  
    } catch (err) {
      console.error("Error creating About Us section:", err);
      return res.status(500).json({
        message: 'Internal server error while creating About Us section.',
        error: err.message,
      });
    }
  };

module.exports = {CreateAboutUs};