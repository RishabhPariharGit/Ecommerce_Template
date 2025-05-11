
const PolicyModel = require('../Models/Policy');
const fs = require('fs');
const { GeneralStatus } = require('../Enum/Enum');

const CreatePolicy = async (req, res) => {
  const { title, effectiveDate, sections, Slug } = req.body;

  if (!req.user || !req.user._id) {
    return res.status(401).json({ message: 'Unauthorized: User not found' });
  }

  try {
    // Validate required fields
    if (!title || !effectiveDate || !sections || !Array.isArray(sections) || sections.length === 0) {
      return res.status(400).json({ message: 'Title, effective date, and at least one section are required.' });
    }

    // Validate each section
    for (let i = 0; i < sections.length; i++) {
      const { heading } = sections[i];
      if (!heading) {
        return res.status(400).json({ message: `Heading is required for section ${i + 1}` });
      }
      
    }

    // Create Policy document
    const newPolicy = new PolicyModel({
      title,
      Slug,  // assuming you want to accept this from client — or generate it
      effectiveDate,
      sections,
      audit: {
        createdDate: new Date(),
        createdBy: req.user._id,
        updatedDate: new Date(),
        updatedBy: req.user._id,
        status: 'Active'
      }
    });

    // Save to DB
    const savedPolicy = await newPolicy.save();

    return res.status(201).json({
      message: 'Policy created successfully!',
      data: savedPolicy
    });

  } catch (err) {
    console.error("Error creating Policy:", err);
    return res.status(500).json({
      message: 'Internal server error while creating Policy.',
      error: err.message
    });
  }
};


const GetAllPolicy = async (req, res) => {
    try {
        const Policys = await PolicyModel.find();
        if (!Policys || Policys.length === 0) {
            return res.status(404).json({ 
                message: 'No Policys found', 
                data: [] // Ensure data is always present
            });
        }
        return res.status(200).json({
            message: "Successfully retrieved Policys",
            data: Policys
        });

    } catch (err) {
        console.error("Error:", err);
        return res.status(500).json({ 
            message: "Internal Server Error", 
            data: [] 
        });
    }
};

const GetPolicyById = async (req, res) => {
    try {
        const { Id } = req.params;
        const Policy = await PolicyModel.findById({ _id: Id });

        if (!Policy) {
            return res.status(404).json({ 
                message: 'Policy not found', 
                data: null 
            });
        }

        return res.status(200).json({
            message: "Successfully retrieved Policy",
            data: Policy
        });

    } catch (err) {
        console.error("Error:", err);
        return res.status(500).json({ 
            message: "Internal Server Error", 
            data: null 
        });
    }
};

const UpdatePolicy = async (req, res) => {
  const { Id } = req.params;
  const { title, Slug, effectiveDate, sections, status } = req.body;

  try {
    if (!req.user || !req.user._id) {
      return res.status(401).json({ message: 'Unauthorized: User not found' });
    }

    // Find existing policy
    const existingPolicy = await PolicyModel.findById(Id);
    if (!existingPolicy) {
      return res.status(404).json({ message: 'Policy not found' });
    }

    // Validate fields
    if (!title || !effectiveDate || !sections || !Array.isArray(sections) || sections.length === 0) {
      return res.status(400).json({ message: 'Title, effective date, and at least one section are required.' });
    }

    // Validate each section
    for (let i = 0; i < sections.length; i++) {
      const { heading } = sections[i];
      if (!heading) {
        return res.status(400).json({ message: `Heading is required for section ${i + 1}` });
      }
      // description and points are optional, so no need to validate them
    }

    // Update fields
    existingPolicy.title = title;
    if (Slug) {
      existingPolicy.Slug = Slug;
    }
    existingPolicy.effectiveDate = effectiveDate;
    existingPolicy.sections = sections;

    if (status) {
      existingPolicy.audit.status = status;
    }

    existingPolicy.audit.updatedDate = new Date();
    existingPolicy.audit.updatedBy = req.user._id;

    // Save updated document
    const updatedPolicy = await existingPolicy.save();

    return res.status(200).json({
      message: 'Policy updated successfully!',
      data: updatedPolicy
    });

  } catch (err) {
    console.error("Error updating Policy:", err);
    return res.status(500).json({
      message: 'Internal server error while updating Policy.',
      error: err.message
    });
  }
};


  
  const DeletePolicy = async (req, res) => {
    const { id } = req.params;
  
    try {
      const Policy = await PolicyModel.findById(id);
      if (!Policy) {
        return res.status(404).json({
          message: 'Policy not found',
          data: null
        });
      }
      await PolicyModel.findByIdAndDelete(id);
  
      return res.status(200).json({
        message: 'Policy deleted successfully!',
        data: null
      });
  
    } catch (err) {
      console.error("Error deleting Policy:", err);
      return res.status(500).json({
        message: 'Error deleting Policy',
        data: null,
        error: err.message
      });
    }
  };



const GetAll_Active_Policy = async (req, res) => {
    try {
        const Policys = await PolicyModel.find({
            "audit.status": "Active"
        });
        
        if (!Policys || Policys.length === 0) {
            return res.status(404).json({ 
                message: 'No Policys found', 
                data: [] // Ensure data is always present
            });
        }
        return res.status(200).json({
            message: "Successfully retrieved Policys",
            data: Policys
        });

    } catch (err) {
        console.error("Error:", err);
        return res.status(500).json({ 
            message: "Internal Server Error", 
            data: [] 
        });
    }
};


const GetPolicyBySlug = async (req, res) => {
  try {
      const { Slug } = req.body; 

      const Policy = await PolicyModel.findOne({ Slug, "audit.status": "Active" });
      if(Policy){
              return res.status(200).json({ message: 'Policy retrieved successfully', data: Policy });
      }else{
          return res.status(404).json({ message: 'No Policy  found', data: null });
      }
  } catch (err) {
      console.error("Error:", err);
      return res.status(500).json({ message: "Internal Server Error", data: null, error: err });
  }
};


module.exports = { GetAllPolicy, CreatePolicy, GetPolicyById, UpdatePolicy, DeletePolicy, GetAll_Active_Policy,GetPolicyBySlug };



