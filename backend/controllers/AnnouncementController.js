

const AnnouncementModel = require('../Models/Announcement');
const fs = require('fs');
const { GeneralStatus } = require('../Enum/Enum');

const CreateAnnouncement = async (req, res) => {
    const { Text, ShowInSite } = req.body;
    if (!req.user || !req.user._id) {
        return res.status(401).json({ message: 'Unauthorized: User not found' });
    }
    try {
        // Create a new Announcement
        const newAnnouncement = new AnnouncementModel({
            Text,
            ShowInSite,
            audit: {
                createdDate: new Date(),
                createdBy: req.user._id,  
                updatedDate: new Date(),
                updatedBy: req.user._id, 
                status: GeneralStatus.ACTIVE
            }
        });

       
        const savedAnnouncement = await newAnnouncement.save();

        return res.status(201).json({
            message: 'Announcement created successfully!',
            data: savedAnnouncement
        });

    } catch (err) {
        console.error("Error creating Announcement:", err);
        return res.status(500).json({ 
            message: 'Error creating Announcement', 
            data: null, 
            error: err 
        });
    }
};


const GetAllAnnouncements = async (req, res) => {
    try {
        const Announcements = await AnnouncementModel.find();
        if (!Announcements || Announcements.length === 0) {
            return res.status(404).json({ 
                message: 'No Announcements found', 
                data: [] // Ensure data is always present
            });
        }
        return res.status(200).json({
            message: "Successfully retrieved Announcements",
            data: Announcements
        });

    } catch (err) {
        console.error("Error:", err);
        return res.status(500).json({ 
            message: "Internal Server Error", 
            data: [] 
        });
    }
};

const GetAll_Active_Announcements = async (req, res) => {
    try {
        const Announcements = await AnnouncementModel.find({
            "audit.status": "Active", 
            ShowInSite: true
        });
        
        if (!Announcements || Announcements.length === 0) {
            return res.status(404).json({ 
                message: 'No Announcements found', 
                data: [] // Ensure data is always present
            });
        }
        return res.status(200).json({
            message: "Successfully retrieved Announcements",
            data: Announcements
        });

    } catch (err) {
        console.error("Error:", err);
        return res.status(500).json({ 
            message: "Internal Server Error", 
            data: [] 
        });
    }
};


const GetAnnouncementById = async (req, res) => {
    try {
        const { Id } = req.params;
        const Announcement = await AnnouncementModel.findById({ _id: Id });

        if (!Announcement) {
            return res.status(404).json({ 
                message: 'Announcement not found', 
                data: null 
            });
        }

        return res.status(200).json({
            message: "Successfully retrieved Announcement",
            data: Announcement
        });

    } catch (err) {
        console.error("Error:", err);
        return res.status(500).json({ 
            message: "Internal Server Error", 
            data: null 
        });
    }
};

const UpdateAnnouncement = async (req, res) => {
    const { Id } = req.params;
    const { Text, ShowInSite , Status} = req.body;

    try {  
        if (!req.user || !req.user._id) {
            return res.status(401).json({ message: 'Unauthorized: User not found' });
        }      
        const existingAnnouncement = await AnnouncementModel.findOne({ _id: Id });
        if (!existingAnnouncement) {
            return res.status(404).json({ 
                message: 'Announcement not found', 
                data: null 
            });
        }

       

        existingAnnouncement.Text = Text;
        existingAnnouncement.ShowInSite = ShowInSite;
        existingAnnouncement.audit.status = Status;
        existingAnnouncement.audit.updatedDate = new Date();
        existingAnnouncement.audit.updatedBy = req.user._id;

        const updatedAnnouncement = await existingAnnouncement.save();

        return res.status(200).json({
            message: 'Announcement updated successfully!',
            data: updatedAnnouncement
        });

    } catch (err) {
        console.error("Error:", err);
        return res.status(500).json({ 
            message: 'Error updating Announcement', 
            data: null, 
            error: err 
        });
    }
};

const DeleteAnnouncement = async (req, res) => {
    const { id } = req.params;

    try {
        const Announcement = await AnnouncementModel.findById(id);
        if (!Announcement) {
            return res.status(404).json({ 
                message: 'Announcement not found', 
                data: null 
            });
        }

        await AnnouncementModel.findByIdAndDelete(id);

        return res.status(200).json({ 
            message: 'Announcement, subAnnouncements, products, and their images deleted successfully!', 
            data: null 
        });

    } catch (err) {
        console.error("Error deleting Announcement:", err);
        return res.status(500).json({ 
            message: 'Error deleting Announcement', 
            data: null, 
            error: err 
        });
    }
};



module.exports = { GetAllAnnouncements, CreateAnnouncement, GetAnnouncementById, UpdateAnnouncement, DeleteAnnouncement, GetAll_Active_Announcements };



