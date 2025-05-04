
const ScrollingTextModel = require('../Models/ScrollingText');
const fs = require('fs');
const { GeneralStatus } = require('../Enum/Enum');

const CreateScrollingText = async (req, res) => {
    const { Text, isMegaText } = req.body;
    if (!req.user || !req.user._id) {
      return res.status(401).json({ message: 'Unauthorized: User not found' });
    }
  
    try {
      const newScrollingText = new ScrollingTextModel({
        Text,
        isMegaText,  
        audit: {
          createdDate: new Date(),
          createdBy: req.user._id,
          updatedDate: new Date(),
          updatedBy: req.user._id,
          status: GeneralStatus.ACTIVE
        }
      });
  
      const savedScrollingText = await newScrollingText.save();
  
      return res.status(201).json({
        message: 'ScrollingText created successfully!',
        data: savedScrollingText
      });
  
    } catch (err) {
      console.error("Error creating ScrollingText:", err);
      return res.status(500).json({ message: 'Error creating ScrollingText', data: null, error: err });
    }
  };
  


const GetAllScrollingTexts = async (req, res) => {
    try {
        const ScrollingTexts = await ScrollingTextModel.find();
        if (!ScrollingTexts || ScrollingTexts.length === 0) {
            return res.status(404).json({ 
                message: 'No ScrollingTexts found', 
                data: [] // Ensure data is always present
            });
        }
        return res.status(200).json({
            message: "Successfully retrieved ScrollingTexts",
            data: ScrollingTexts
        });

    } catch (err) {
        console.error("Error:", err);
        return res.status(500).json({ 
            message: "Internal Server Error", 
            data: [] 
        });
    }
};

const GetScrollingTextById = async (req, res) => {
    try {
        const { Id } = req.params;
        const ScrollingText = await ScrollingTextModel.findById({ _id: Id });

        if (!ScrollingText) {
            return res.status(404).json({ 
                message: 'ScrollingText not found', 
                data: null 
            });
        }

        return res.status(200).json({
            message: "Successfully retrieved ScrollingText",
            data: ScrollingText
        });

    } catch (err) {
        console.error("Error:", err);
        return res.status(500).json({ 
            message: "Internal Server Error", 
            data: null 
        });
    }
};

const UpdateScrollingText = async (req, res) => {
    const { Id } = req.params;
    const { Text, isMegaText,Status} = req.body;

    try {  
        if (!req.user || !req.user._id) {
            return res.status(401).json({ message: 'Unauthorized: User not found' });
        }      
        const existingScrollingText = await ScrollingTextModel.findOne({ _id: Id });
        if (!existingScrollingText) {
            return res.status(404).json({ 
                message: 'ScrollingText not found', 
                data: null 
            });
        }
        existingScrollingText.Text = Text;
        existingScrollingText.isMegaText = isMegaText;
        existingScrollingText.audit.status = Status;
        existingScrollingText.audit.updatedDate = new Date();
        existingScrollingText.audit.updatedBy = req.user._id;

        const updatedScrollingText = await existingScrollingText.save();

        return res.status(200).json({
            message: 'ScrollingText updated successfully!',
            data: updatedScrollingText
        });

    } catch (err) {
        console.error("Error:", err);
        return res.status(500).json({ 
            message: 'Error updating ScrollingText', 
            data: null, 
            error: err 
        });
    }
};

const DeleteScrollingText = async (req, res) => {
    const { id } = req.params;

    try {
        const ScrollingText = await ScrollingTextModel.findById(id);
        if (!ScrollingText) {
            return res.status(404).json({ 
                message: 'ScrollingText not found', 
                data: null 
            });
        }

        await ScrollingTextModel.findByIdAndDelete(id);

        return res.status(200).json({ 
            message: 'ScrollingText,  deleted successfully!', 
            data: null 
        });

    } catch (err) {
        console.error("Error deleting ScrollingText:", err);
        return res.status(500).json({ 
            message: 'Error deleting ScrollingText', 
            data: null, 
            error: err 
        });
    }
};

const GetAll_Active_ScrollingTexts = async (req, res) => {
    try {
        const ScrollingTexts = await ScrollingTextModel.find({
            "audit.status": "Active"
        });
        
        if (!ScrollingTexts || ScrollingTexts.length === 0) {
            return res.status(404).json({ 
                message: 'No ScrollingTexts found', 
                data: [] // Ensure data is always present
            });
        }
        return res.status(200).json({
            message: "Successfully retrieved ScrollingTexts",
            data: ScrollingTexts
        });

    } catch (err) {
        console.error("Error:", err);
        return res.status(500).json({ 
            message: "Internal Server Error", 
            data: [] 
        });
    }
};

module.exports = { GetAllScrollingTexts, CreateScrollingText, GetScrollingTextById, UpdateScrollingText, DeleteScrollingText, GetAll_Active_ScrollingTexts };



