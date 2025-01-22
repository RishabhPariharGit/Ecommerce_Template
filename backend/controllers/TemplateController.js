const TemplateModel = require('../Models/Template');
const StyleModel = require('../Models/Style');
const { GeneralStatus } = require('../Enum/Enum');

const Createtemplate = async (req, res) => {
    try {
      const { templatePayload, stylingPayload } = req.body;
  
      // Save template data
      const savedTemplate = await TemplateModel.create(templatePayload);
  
      if (!savedTemplate) {
        return res.status(500).json({ message: 'Failed to save template.' });
      }
  
      // Attach the created template ID to the styling payload
      stylingPayload.templateId = savedTemplate._id;
  
      // Save styling data
      const savedStyling = await StyleModel.create(stylingPayload);
  
      if (!savedStyling) {
        return res.status(500).json({ message: 'Failed to save styling.' });
      }
  
      res.status(200).json({
        message: 'Template and styling saved successfully.',
        template: savedTemplate,
        styling: savedStyling,
      });
    } catch (error) {
      console.error('Error saving template and styling:', error);
      res.status(500).json({ message: 'Internal server error.' });
    }
  };

  const GetAllTemplate = async (req, res) => {
    try {  
        const Templates = await TemplateModel.find();
        if (!Templates || Templates.length === 0) {
            return res.status(404).json({ message: 'No Templates found.' });
        }        
        return res.status(200).json(Templates);
    } catch (err) {
        console.error("Error:", err);

        // Handle any unexpected errors
        return res.status(500).json({ message: "Internal Server Error" });
    }
};
  

const GetTemplateById = async (req, res) => {
    try {
      const { id } = req.params; 
      
      const template = await TemplateModel.findById(id);
      if (!template) {
        return res.status(404).json({ message: 'Template not found' });
      }
      const styles = await StyleModel.find({ templateId: id });
      return res.status(200).json({
        template,
        styles,
      });
    } catch (err) {
      console.error("Error:", err);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  };

  const UpdateTemplate = async (req, res) => {
    try {
        const { id } = req.params; 
        const { templatePayload, stylingPayload } = req.body; 
       
        const existingTemplate = await TemplateModel.findById(id);
        if (!existingTemplate) {
            return res.status(404).json({ message: 'Template not found' });
        }

        Object.assign(existingTemplate, templatePayload); // Merge new data into the existing template
        const updatedTemplate = await existingTemplate.save(); // Save the updated template

        if (!updatedTemplate) {
            return res.status(500).json({ message: 'Failed to update the template.' });
        }

        const existingStyling = await StyleModel.findOne({ templateId: id });

        if (existingStyling) 
        {
            Object.assign(existingStyling, stylingPayload);
            const updatedStyling = await existingStyling.save();

            if (!updatedStyling) {
                return res.status(500).json({ message: 'Failed to update styling.' });
            }

            return res.status(200).json({
                message: 'Template and styling updated successfully.',
                template: updatedTemplate,
                styling: updatedStyling,
            });
        } else {
            // If no styling exists, create new styling
            stylingPayload.templateId = id; // Attach the template ID to the styling payload
            const newStyling = await StyleModel.create(stylingPayload);

            if (!newStyling) {
                return res.status(500).json({ message: 'Failed to save new styling.' });
            }

            return res.status(200).json({
                message: 'Template updated and new styling created successfully.',
                template: updatedTemplate,
                styling: newStyling,
            });
        }
    } catch (error) {
        console.error('Error updating template and styling:', error);
        res.status(500).json({ message: 'Internal server error.' });
    }
};


const DeleteTemplate = async (req, res) => { 
    const { id } = req.params;
    try {
        const Page = await TemplateModel.findById(id);
        if (!Page) {
            return res.status(404).json({ message: 'Template not found' });
        }
        await TemplateModel.findByIdAndDelete(id);

        res.status(200).json({ message: 'Template deleted successfully!' });
    } catch (err) {
        console.error("Error deleting Template:", err);
        res.status(500).json({ message: 'Error deleting Template', error: err });
    }
};
  
module.exports = {Createtemplate,GetAllTemplate,UpdateTemplate,GetTemplateById,DeleteTemplate};