import React, { useState,useRef,useEffect} from "react";
import { createTemplate, getTemplateById,updateTemplate } from '../../Services/TemplateService';
import { useParams,useNavigate } from 'react-router-dom';
import '../AdminStyle/AdminGlobalStyle.css';


const CreateTemplateForm = ({ isEditMode = false }) => {
  const [selectedSection, setSelectedSection] = useState("header"); // Default section
  const [selectedSections, setSelectedSections] = useState({
    header: true, // Default selected
    footer: true, // Default selected
    main: true,   // Default selected
  });
  const [templateName, setTemplateName] = useState(""); // Template name
  const [cssProperties, setCssProperties] = useState({
    header: {
      backgroundColor: "#ffffff",
      color: "#000000",
      padding: "10px",
      margin: "0",
      fontSize: "16px",
    },
    footer: {
      backgroundColor: "#f1f1f1",
      color: "#333333",
      padding: "20px",
      margin: "0",
      fontSize: "14px",
    },
    main: {
      backgroundColor: "#ffffff",
      height:"100vh",
      color: "#000000",
      padding: "20px",
      margin: "10px",
      fontSize: "18px",
    },
  });
  const isFetchedRef = useRef(false); // Prevent multiple API cal
  const navigate = useNavigate();
  const { Id } = useParams();


useEffect(() => {
  
    if (!isFetchedRef.current) {
        const loadTemplate = async () => {
            try {
                const response = await getTemplateById(Id);
                const template = response.data.template;
                const styles = response.data.styles;

                if (template) {
                    // Update the state with fetched data
                    setTemplateName(template.name);
                    setSelectedSections({
                        header: template.layout.header,
                        footer: template.layout.footer,
                        main: template.layout.mainBody,
                    });
                    setCssProperties(JSON.parse(template.cssContent));
                }

                if (styles && styles.length > 0) {
                    // Handle styles if required (currently not used in the form)
                    console.log("Fetched styles:", styles);
                }
            } catch (err) {
                console.error("Error fetching template:", err);
            } 
        };

        if (isEditMode && Id) loadTemplate();
        isFetchedRef.current = true;
    }
}, [isEditMode, Id]);


  const handleChange = (property, value) => {
    setCssProperties((prev) => ({
      ...prev,
      [selectedSection]: {
        ...prev[selectedSection],
        [property]: value,
      },
    }));
  };

  const handleSaveStyles = async () => {
    try {
      if (!templateName) {
        alert("Please enter a template name.");
        return;
      }

      
      // Construct the styling payload
      const stylingPayload = {
        name: "Custom Styling",
        backgroundColor: cssProperties[selectedSection].backgroundColor,
        fontColor: cssProperties[selectedSection].color,
        margin: cssProperties[selectedSection].margin,
        padding: cssProperties[selectedSection].padding,
        fontSize: {
          header: cssProperties.header.fontSize,
          body: cssProperties.main.fontSize,
          subHeader: "20px", // Example: Use a default or dynamic value
        },
      };

      const templatePayload = {
        name: templateName,
        layout: {
          header: selectedSections.header,
          footer: selectedSections.footer,
          sidebar: false,
          mainBody: selectedSections.main,
        },
        htmlContent: `
          <div style="${JSON.stringify(cssProperties.header)}">Header</div>
          <div style="${JSON.stringify(cssProperties.main)}">Main Content</div>
          <div style="${JSON.stringify(cssProperties.footer)}">Footer</div>
        `,
        cssContent: JSON.stringify(cssProperties), // Save CSS properties as a string
      };
        // Call appropriate API based on edit mode
        if (isEditMode) {
            await updateTemplate(Id, templatePayload,stylingPayload );
            console.log('Product updated successfully');
        } else {
            // Save the template
      const templateResponse = await createTemplate(templatePayload, stylingPayload);

      if (templateResponse) {
        alert("Template and styling saved successfully!");
      }
        }

        // Navigate to product listing page on success
        navigate('/admin/Templates');
    } catch (err) {
        console.error('Error submitting form:', err);

        // Display error message to user
        alert('Failed to submit the form. Please try again.');
    }


     
  };

  const handleSectionSelection = (section) => {
    setSelectedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  return (
    <div className="main-template-main-wrapper">
      {/* Left: Control Panel */}
      <div className="main-css-editor-main-wrapper">
        <h3 className="main-template-main-head">CSS Editor</h3>

        {/* Template Name */}
      <div className="main-css-editor-main-wrapper-fields-main-class">

        <label className="template-fields-main-head">
        <h4 className="template-fields-subhead">Template Name:</h4>
          <input
            type="text"
            value={templateName}
            onChange={(e) => setTemplateName(e.target.value)}
            placeholder="Enter template name"
          />
        </label>

        {/* Layout Selection: Checkboxes for header, footer, and main content */}
        <div>
          <h4 className="template-fields-subhead">Select Sections to Include</h4>

          <div className="template-select-section-fields">
          <label className="input-checkbox-mn-cls">
            <input
              type="checkbox"
              checked={selectedSections.header}
              onChange={() => handleSectionSelection("header")}
            />
            Header
          </label>

          <label className="input-checkbox-mn-cls">
            <input
              type="checkbox"
              checked={selectedSections.main}
              onChange={() => handleSectionSelection("main")}
            />
            Main Content
          </label>

          <label className="input-checkbox-mn-cls">
            <input
              type="checkbox"
              checked={selectedSections.footer}
              onChange={() => handleSectionSelection("footer")}
            />
            Footer
          </label>
          </div>
        </div>

        {/* Section Selection Dropdown */}
        <label className="template-fields-main-head">
         <h4 className="template-fields-subhead">Select Section:</h4> 
          <select
            value={selectedSection}
            onChange={(e) => setSelectedSection(e.target.value)}
          >
            <option value="header">Header</option>
            <option value="main">Main Content</option>
            <option value="footer">Footer</option>
          </select>
        </label>

        <div className="editing-settings-main">
          <h4 className="template-fields-subhead">Edit CSS for {selectedSection}</h4>
          <label className="main-label-cls clr-mn-cls">
            Background Color
            <input
              type="color"
              value={cssProperties[selectedSection].backgroundColor}
              onChange={(e) => handleChange("backgroundColor", e.target.value)}
            />
          </label>

          <label className="main-label-cls clr-mn-cls">
            Text Color
            <input
              type="color"
              value={cssProperties[selectedSection].color}
              onChange={(e) => handleChange("color", e.target.value)}
            />
          </label>

          <label className="main-label-cls">
            Padding:
            <input
              type="text"
              value={cssProperties[selectedSection].padding}
              onChange={(e) => handleChange("padding", e.target.value)}
            />
          </label>

          <label className="main-label-cls">
            Margin:
            <input
              type="text"
              value={cssProperties[selectedSection].margin}
              onChange={(e) => handleChange("margin", e.target.value)}
            />
          </label>

          <label className="main-label-cls">
            Font Size:
            <input
              type="number"
              value={cssProperties[selectedSection].fontSize.replace("px", "")}
              onChange={(e) =>
                handleChange("fontSize", `${e.target.value}px`)
              }
            />
          </label>
        </div>

        <button onClick={handleSaveStyles} className="button">Save Styles</button>
      </div>
</div>
      {/* Right: Template Preview */}
      <div className="main-template-preview-main-wrapper">
        <h3 className="main-template-main-head">Template Preview</h3>
        {selectedSections.header && (
          <div
            style={{
              ...cssProperties.header,
              borderBottom: "1px solid #ccc",
            }}
          >
            Header
          </div>
        )}
        {selectedSections.main && (
          <div
            style={{
              ...cssProperties.main,
            }}
          >
            Main Content
          </div>
        )}
        {selectedSections.footer && (
          <div
            style={{
              ...cssProperties.footer,
              borderTop: "1px solid #ccc",
            }}
          >
            Footer
          </div>
        )}
      </div>
    </div>
  );
};

export default CreateTemplateForm;
