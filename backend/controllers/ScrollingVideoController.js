
const ScrollingVideoModel = require('../Models/ScrollingVideo');
const fs = require('fs');
const { GeneralStatus } = require('../Enum/Enum');

const CreateScrollingVideo = async (req, res) => {
    const { Text, Video } = req.body;
    if (!req.user || !req.user._id) {
      return res.status(401).json({ message: 'Unauthorized: User not found' });
    }
  
    try {

        let uploadedVideoUrl = '';
        if (Video) {
            try {
                const cloudinary = req.app.locals.cloudinary;
                const result = await cloudinary.uploader.upload(Video, {
                    folder: 'Video',
                    resource_type: 'video'  // 👈 this tells Cloudinary it's a video, not an image
                });
                uploadedVideoUrl = result.secure_url;
            } catch (error) {
                console.error("Error uploading Video:", error);
                return res.status(500).json({ 
                    message: 'Error uploading Video to Cloudinary', 
                    data: null, 
                    error 
                });
            }
        }
         else {
            return res.status(400).json({ 
                message: 'Video file is required', 
                data: null 
            });
        }
      const newScrollingVideo = new ScrollingVideoModel({
        Text,
        Video:uploadedVideoUrl,  
        audit: {
          createdDate: new Date(),
          createdBy: req.user._id,
          updatedDate: new Date(),
          updatedBy: req.user._id,
          status: GeneralStatus.ACTIVE
        }
      });
  
      const savedScrollingVideo = await newScrollingVideo.save();
  
      return res.status(201).json({
        message: 'ScrollingVideo created successfully!',
        data: savedScrollingVideo
      });
  
    } catch (err) {
      console.error("Error creating ScrollingVideo:", err);
      return res.status(500).json({ message: 'Error creating ScrollingVideo', data: null, error: err });
    }
  };
 
const GetAllScrollingVideos = async (req, res) => {
    try {
        const ScrollingVideos = await ScrollingVideoModel.find();
        if (!ScrollingVideos || ScrollingVideos.length === 0) {
            return res.status(404).json({ 
                message: 'No ScrollingVideos found', 
                data: [] // Ensure data is always present
            });
        }
        return res.status(200).json({
            message: "Successfully retrieved ScrollingVideos",
            data: ScrollingVideos
        });

    } catch (err) {
        console.error("Error:", err);
        return res.status(500).json({ 
            message: "Internal Server Error", 
            data: [] 
        });
    }
};

const GetScrollingVideoById = async (req, res) => {
    try {
        const { Id } = req.params;
        const ScrollingVideo = await ScrollingVideoModel.findById({ _id: Id });

        if (!ScrollingVideo) {
            return res.status(404).json({ 
                message: 'ScrollingVideo not found', 
                data: null 
            });
        }

        return res.status(200).json({
            message: "Successfully retrieved ScrollingVideo",
            data: ScrollingVideo
        });

    } catch (err) {
        console.error("Error:", err);
        return res.status(500).json({ 
            message: "Internal Server Error", 
            data: null 
        });
    }
};

const UpdateScrollingVideo = async (req, res) => {
    const { Id } = req.params;
    const { Text, Video, Status } = req.body;

    try {
        if (!req.user || !req.user._id) {
            return res.status(401).json({ message: 'Unauthorized: User not found' });
        }

        const existingScrollingVideo = await ScrollingVideoModel.findOne({ _id: Id });
        if (!existingScrollingVideo) {
            return res.status(404).json({
                message: 'ScrollingVideo not found',
                data: null
            });
        }

        const cloudinary = req.app.locals.cloudinary;
        let uploadedVideoUrl = existingScrollingVideo.Video;

        if (Video) {
            try {
                // Delete existing video from Cloudinary
                if (existingScrollingVideo.Video) {
                    const videoUrlParts = existingScrollingVideo.Video.split('/');
                    const publicIdWithExt = videoUrlParts[videoUrlParts.length - 1];
                    const publicId = 'Video/' + publicIdWithExt.split('.')[0];

                    await cloudinary.uploader.destroy(publicId, {
                        resource_type: 'video'
                    });
                }

                // Upload new video
                const result = await cloudinary.uploader.upload(Video, {
                    folder: 'Video',
                    resource_type: 'video'
                });
                uploadedVideoUrl = result.secure_url;

            } catch (error) {
                console.error("Error uploading video:", error);
                return res.status(500).json({
                    message: 'Error uploading video to Cloudinary',
                    data: null,
                    error
                });
            }
        }

        // Update fields
        existingScrollingVideo.Text = Text;
        existingScrollingVideo.Video = uploadedVideoUrl;
        existingScrollingVideo.audit.status = Status;
        existingScrollingVideo.audit.updatedDate = new Date();
        existingScrollingVideo.audit.updatedBy = req.user._id;

        const updatedScrollingVideo = await existingScrollingVideo.save();

        return res.status(200).json({
            message: 'ScrollingVideo updated successfully!',
            data: updatedScrollingVideo
        });

    } catch (err) {
        console.error("Error:", err);
        return res.status(500).json({
            message: 'Error updating ScrollingVideo',
            data: null,
            error: err
        });
    }
};


const DeleteScrollingVideo = async (req, res) => {
    const { id } = req.params;

    try {
        const scrollingVideo = await ScrollingVideoModel.findById(id);
        if (!scrollingVideo) {
            return res.status(404).json({
                message: 'ScrollingVideo not found',
                data: null
            });
        }

        const cloudinary = req.app.locals.cloudinary;

        // Delete video from Cloudinary if exists
        if (scrollingVideo.Video) {
            const videoUrlParts = scrollingVideo.Video.split('/');
            const publicIdWithExt = videoUrlParts[videoUrlParts.length - 1];
            const publicId = 'Video/' + publicIdWithExt.split('.')[0];

            try {
                await cloudinary.uploader.destroy(publicId, {
                    resource_type: 'video'
                });
            } catch (err) {
                console.error("Error deleting video from Cloudinary:", err);
                // Proceed with DB delete even if Cloudinary delete fails
            }
        }

        // Delete from MongoDB
        await ScrollingVideoModel.findByIdAndDelete(id);

        return res.status(200).json({
            message: 'ScrollingVideo deleted successfully!',
            data: null
        });

    } catch (err) {
        console.error("Error deleting ScrollingVideo:", err);
        return res.status(500).json({
            message: 'Error deleting ScrollingVideo',
            data: null,
            error: err
        });
    }
};

const GetAll_Active_ScrollingVideos = async (req, res) => {
    try {
        const ScrollingVideos = await ScrollingVideoModel.find({
            "audit.status": "Active"
        });
        
        if (!ScrollingVideos || ScrollingVideos.length === 0) {
            return res.status(404).json({ 
                message: 'No ScrollingVideos found', 
                data: [] // Ensure data is always present
            });
        }
        return res.status(200).json({
            message: "Successfully retrieved ScrollingVideos",
            data: ScrollingVideos
        });

    } catch (err) {
        console.error("Error:", err);
        return res.status(500).json({ 
            message: "Internal Server Error", 
            data: [] 
        });
    }
};

module.exports = { GetAllScrollingVideos, CreateScrollingVideo, GetScrollingVideoById, UpdateScrollingVideo, DeleteScrollingVideo, GetAll_Active_ScrollingVideos };



