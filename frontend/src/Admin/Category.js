import React, { useState } from 'react';
import { addCategory } from '../Services/CategoryService';
import './AdminStyle/AdminGlobalStyle.css'

const Category = () => {
    const [previewSource, setPreviewSource] = useState('');
    const [formData, setFormData] = useState({
        Name: '',
        Description: '',
        Slug: '',
        label_image: ''
    });

    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleFileInputChange = (e) => {
        const file = e.target.files[0];
        if (file && file.type.startsWith('image/')) {
            previewFile(file);
        } else {
            alert('Please upload a valid image file.');
        }
    };


    const previewFile = (file) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
            setPreviewSource(reader.result);
            setFormData({ ...formData, label_image: reader.result }); // Store base64 image
        };
    };

    const handleSubmitFile = async (e) => {
        e.preventDefault(); // Prevent form refresh

        try {
            const response = await addCategory(formData); // Send the formData directly
            console.log('Category created successfully:', response.data.category);
        } catch (err) {
            console.error('Error creating category:', err);
        }
    };

    return (
        <div>
  
  <div class="pagetitle">Create a New Category </div>
        <div className='form-800'>
            <div className='white-bg'>
                <div className="input-form">
                    <div className='sectionheader'>Create a New Category</div>
                    <form onSubmit={handleSubmitFile}>
                        <table>
                            <tr>
                                <td>
                                    <div className='formlabel'>
                                        Name
                                    </div>
                                    <div>
                                        <input
                                            type="text"
                                            name="Name"
                                            placeholder="Category Name"
                                            value={formData.Name}
                                            onChange={handleInputChange}
                                            required
                                        />
                                    </div>
                                </td>
                                <td>
                                    <div className='formlabel'>Slug</div>
                                    <div>
                                        <input
                                            type="text"
                                            name="Slug"
                                            placeholder="Slug"
                                            value={formData.Slug}
                                            onChange={handleInputChange}
                                            required
                                        />
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td style={{ maxWidth: '1000px' }}>
                                    <div className='formlabel'>Description</div>
                                    <div >
                                        <textarea
                                            name="Description"
                                            placeholder="Category Description"
                                            value={formData.Description}
                                            onChange={handleInputChange}
                                        />
                                    </div>

                                </td>
                               
                            </tr>
                            <tr>
                                <td>
                                    <div className='formlabel'>Image</div>
                                    <div> <input
                                        type="file"
                                        name="label_image"
                                        onChange={handleFileInputChange}
                                        className="form-input"
                                        required
                                    /></div>
                                </td>
                                <td></td>
                            </tr>
                            <tr>
                                <td>
                                    <div className='text-center'>
                                        <button type="submit" className="button">
                                            Submit
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        </table>
                    </form>
                    {previewSource && (
                        <img
                            src={previewSource}
                            alt="Selected"
                            style={{ height: '300px', marginTop: '20px' }}
                        />
                    )}
                </div>
            </div>
        </div>
        </div>
    );
};

export default Category;
