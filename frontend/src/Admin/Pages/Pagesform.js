import React, { useState, useEffect, useRef } from 'react';
import { addPage, getPageBySlug ,updatePage} from '../../Services/PagesService';
import { getAllTemplates } from '../../Services/TemplateService';
import '../AdminStyle/AdminGlobalStyle.css';
import { useNavigate, useParams } from 'react-router-dom';


const PagesForm = ({ isEditMode = false }) => {
    const [previewSources, setPreviewSources] = useState([]);
    const [templates, setTemplates] = useState([]);
    const [formData, setFormData] = useState({
        Title: '',
        Content: '',
        Images: [],
        Slug: '',
        Visibility: 'visible', // Default to 'Public'
        Visibility_date: '',
        TemplateId: '', 
    });
    const { slug } = useParams();
    const navigate = useNavigate();
    const isFetchedRef = useRef(false);

    useEffect(() => {
        if (!isFetchedRef.current) {
            
            const loadCategory = async () => {
                try {
                    const response = await getPageBySlug(slug);
                    const page = response.data;
                    setFormData({
                        Title: page.Title,
                        Content: page.Content,
                        Slug: page.Slug,
                        Images: page.Images,
                        Visibility: page.Visibility,
                        Visibility_date: page.Visibility_date

                    });
                } catch (err) {
                    console.error('Error fetching category:', err);
                }
            };
            const loadTemplates = async () => {
                try {
                    
                    const response = await getAllTemplates();
                    setTemplates(response.data);
                } catch (err) {
                    console.error('Error loading templates:', err);
                }
            };
            const loadpage = async () => {
                try { 
                    
                    if (isEditMode && slug) {
                        const response = await getPageBySlug(slug);
                        const page = response.data;
                        setFormData({
                            Title: page.Title,
                            Content: page.Content,
                            Slug: page.Slug,
                            Images: page.Images || [],
                            Visibility: page.Visibility,
                            Visibility_date: page.Visibility_date ? new Date(page.Visibility_date).toISOString().split("T")[0] : '',
                            TemplateId: page.TemplateId || '',
                        });
                        setPreviewSources(page.Images || []);
                    }
                } catch (err) {
                    console.error('Error fetching page data:', err);
                }
            };
            if (isEditMode && slug) {
                loadCategory(); 
                loadpage();         
            }
            loadTemplates();

            isFetchedRef.current = true; // Mark data as fetched
        }
    }, [isEditMode, slug]);

    const handleRemoveImage = (index, event) => {
        event.preventDefault();
        setPreviewSources((prevSources) => prevSources.filter((_, i) => i !== index));
        setFormData((prevData) => ({
            ...prevData,
            Images: prevData.Images.filter((_, i) => i !== index),
        }));
    };

    const handleFileInputChange = (e) => {
        const files = Array.from(e.target.files);
        const newBase64Strings = [];

        files.forEach((file) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);

            reader.onloadend = () => {
                newBase64Strings.push(reader.result);
                if (newBase64Strings.length === files.length) {
                    setPreviewSources((prevSources) => [...prevSources, ...newBase64Strings]);
                    setFormData((prevData) => ({
                        ...prevData,
                        Images: [...prevData.Images, ...newBase64Strings],
                    }));
                }
            };
        });
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmitForm = async (e) => {
        e.preventDefault();

        try {
            if(isEditMode){
                await updatePage(slug,formData);
                console.log('Page updated successfully');
            }else{
                await addPage(formData);
                console.log('Page created successfully');
            }
           
            navigate('/admin/Pages');
        } catch (err) {
            console.error('Error submitting form:', err);
            alert('Failed to submit the form. Please try again.');
        }
    };

    const handleCancel = () => navigate('/admin/Pages');

    return (
        <div>
          
            <div className="white-bg-btn">
                <div className="title-bread-crumbs">
                    <p>{isEditMode ? 'Edit Page' : 'Create Page'}</p>
                </div>
            </div>
            <div className="form-800">
                <div className="white-bg">
                    <form onSubmit={handleSubmitForm}>
                        <table>
                            <tbody>
                                {/* Title and Content */}
                                <tr>
                                    <td>
                                        <div className="formlabel">Title</div>
                                        <input
                                            type="text"
                                            name="Title"
                                            value={formData.Title}
                                            onChange={handleInputChange}
                                            required
                                        />
                                    </td>
                                    <td>
                                        <div className="formlabel">Content</div>
                                        <textarea
                                            name="Content"
                                            value={formData.Content}
                                            onChange={handleInputChange}
                                            required
                                            rows="4"
                                        />
                                    </td>
                                </tr>

                                {/* Visibility and Visibility Date */}
                                <tr>
                                    <td>
                                        <div className="formlabel">Visibility</div>
                                        <select
                                            name="Visibility"
                                            value={formData.Visibility}
                                            onChange={handleInputChange}
                                            required
                                        >
                                            <option value="visible">visible</option>
                                            <option value="hidden">hidden</option>
                                        </select>
                                    </td>
                                    <td>
                                        <div className="formlabel">Visibility Date</div>
                                        <input
                                            type="date"
                                            name="Visibility_date"
                                            value={formData.Visibility_date}
                                            onChange={handleInputChange}
                                        />
                                    </td>
                                </tr>

                                {/* Images */}
                                <tr>
                                    <td colSpan="2">
                                        <div className="formlabel">Images</div>
                                        <input
                                            type="file"
                                            name="Images"
                                            accept="image/*"
                                            onChange={handleFileInputChange}
                                            multiple
                                        />
                                        {/* Preview Image Section */}
                                        <div className="image-preview-section">
                                            {previewSources && previewSources.length > 0 ? (
                                                previewSources.map((source, index) => (
                                                    <div
                                                        key={index}
                                                        style={{
                                                            position: 'relative',
                                                            display: 'inline-block',
                                                            margin: '5px',
                                                        }}
                                                    >
                                                        <img
                                                            src={source}
                                                            alt={`Preview ${index + 1}`}
                                                            style={{ maxWidth: '100px' }}
                                                        />
                                                        <button
                                                            onClick={(event) => handleRemoveImage(index, event)}
                                                            style={{
                                                                position: 'absolute',
                                                                top: '0',
                                                                right: '0',
                                                                background: 'red',
                                                                color: 'white',
                                                                border: 'none',
                                                                borderRadius: '50%',
                                                                cursor: 'pointer',
                                                                padding: '2px 5px',
                                                            }}
                                                        >
                                                            &times;
                                                        </button>
                                                    </div>
                                                ))
                                            ) : (
                                                <p>No images selected</p>
                                            )}
                                        </div>
                                    </td>
                                </tr>
                                  {/* Add template */}
                                <tr>
                                    <td colSpan="2">
                                        <div className="formlabel">Select Template</div>
                                        <select
                                            name="TemplateId"
                                            value={formData.TemplateId}
                                            onChange={handleInputChange}
                                            required
                                        >
                                            <option value="" disabled>Select a template</option>
                                            {templates.map((template) => (
                                                <option key={template._id} value={template._id}>
                                                    {template.name}
                                                </option>
                                            ))}
                                        </select>
                                    </td>
                                </tr>

                                {/* Submit and Cancel */}
                                <tr>
                                    <td colSpan="2">
                                        <div>
                                            <button type="submit" className="button">
                                                {isEditMode ? 'Update Page' : 'Create Page'}
                                            </button>
                                            <button
                                                type="button"
                                                className="button cancel-button"
                                                onClick={handleCancel}
                                            >
                                                Cancel
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default PagesForm;
