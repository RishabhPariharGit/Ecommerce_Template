import React, { useState, useEffect, useRef } from 'react';
import { addUsps, updateUsps, getUspsById } from '../../../../../Services/AdminServices/Allservices/UspsService';
import '../../../../AdminStyle/AdminGlobalStyle.css';
import { useNavigate, useParams } from 'react-router-dom';

const UspsForm = ({ isEditMode = false }) => {
    const [formData, setFormData] = useState({
        MainHeading: '',
        SubHeading: '',
        IconBlocks: [
            { icon_image: '', title: '', description: '' }
        ],
        Status: ''
    });

    const [isLoading, setIsLoading] = useState(true);
    const { Id } = useParams();
    const navigate = useNavigate();
    const isFetchedRef = useRef(false);

    useEffect(() => {
        if (!isFetchedRef.current) {
            const loadUsps = async () => {
                try {
                    const response = await getUspsById(Id);
                    if (!response.data) {
                        console.error('Usps data is null or not found');
                        return;
                    }
                    const usps = response.data;
                    setFormData({
                        MainHeading: usps.MainHeading,
                        SubHeading: usps.SubHeading,
                        IconBlocks: usps.IconBlocks.length ? usps.IconBlocks : [{ icon_image: '', title: '', description: '' }],
                        Status: usps.audit.status
                    });
                } catch (err) {
                    console.error('Error fetching Usps:', err);
                } finally {
                    setIsLoading(false);
                }
            };

            if (isEditMode && Id) {
                loadUsps();
            } else {
                setIsLoading(false);
            }

            isFetchedRef.current = true;
        }
    }, [isEditMode, Id]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const handleIconBlockChange = (index, e) => {
        const { name, value } = e.target;
        const updatedBlocks = [...formData.IconBlocks];
        updatedBlocks[index][name] = value;
        setFormData((prev) => ({
            ...prev,
            IconBlocks: updatedBlocks
        }));
    };



    const handleIconFileChange = (index, e) => {
        const file = e.target.files[0];
        if (file && file.type.startsWith('image/')) {
            const reader = new FileReader();  // <-- missing this in your code

            reader.onloadend = () => {
                const updatedBlocks = [...formData.IconBlocks];
                updatedBlocks[index].icon_image = reader.result;  // set base64 string

                setFormData((prev) => ({
                    ...prev,
                    IconBlocks: updatedBlocks
                }));
            };

            reader.readAsDataURL(file);  // <-- read file as base64
        } else {
            alert('Please upload a valid image file.');
        }
    };


    const handleAddIconBlock = () => {
        setFormData((prev) => ({
            ...prev,
            IconBlocks: [...prev.IconBlocks, { icon_image: '', title: '', description: '' }]
        }));
    };

    const handleRemoveIconBlock = (index) => {
        const updatedBlocks = [...formData.IconBlocks];
        updatedBlocks.splice(index, 1);
        setFormData((prev) => ({
            ...prev,
            IconBlocks: updatedBlocks
        }));
    };

    const handleCancel = () => {
        navigate('/admin/Usps');
    };

    const handleSubmitFile = async (e) => {
        e.preventDefault();

        const payload = {
            MainHeading: formData.MainHeading,
            SubHeading: formData.SubHeading,
            IconBlocks: formData.IconBlocks,
        };

        if (isEditMode) {
            payload.Status = formData.Status;
        }

        let response;
        if (isEditMode) {
            response = await updateUsps(Id, payload);
        } else {
            response = await addUsps(payload);
        }

        if (response && response.data) {
            alert(response.message);
            navigate('/admin/Usps');
        } else {
            alert('Unexpected response from the server');
        }
    };

    if (isLoading) return <div>Loading...</div>;

    return (
        <div>
            <div className='pagetitle'>
                {isEditMode ? 'Edit Usps' : 'Create a New Usps'}
            </div>

            <div className="form-800">
                <div className="white-bg">
                    <div className='input-form'>
                        <form onSubmit={handleSubmitFile}>
                            <table>
                                <tbody>

                                    <tr>
                                        <td colSpan="2">
                                            <div className="formlabel">Main Heading</div>
                                            <input
                                                type="text"
                                                name="MainHeading"
                                                value={formData.MainHeading}
                                                onChange={handleInputChange}
                                                required
                                            />
                                        </td>
                                    </tr>

                                    <tr>
                                        <td colSpan="2">
                                            <div className="formlabel">Sub Heading</div>
                                            <input
                                                type="text"
                                                name="SubHeading"
                                                value={formData.SubHeading}
                                                onChange={handleInputChange}
                                                required
                                            />
                                        </td>
                                    </tr>

                                    <tr>
                                        <td colSpan="2">
                                            <div className="formlabel">Icon Blocks</div>
                                            {formData.IconBlocks.map((block, index) => (
                                                <div key={index} style={{
                                                    marginBottom: '10px', gap: '10px',
                                                    flexDirection: 'column',
                                                    display: 'flex'
                                                }}>

                                                    {/* Icon Image Upload */}
                                                    <input
                                                        type="file"
                                                        name="icon_image"
                                                        onChange={(e) => handleIconFileChange(index, e)}
                                                        required={!isEditMode}
                                                    />

                                                    {/* Icon Preview */}
                                                    {block.icon_image && (
                                                        <img src={block.icon_image} alt="Icon Preview" style={{ height: '80px', marginTop: '5px' }} />
                                                    )}

                                                    {/* Title */}
                                                    <input
                                                        type="text"
                                                        name="title"
                                                        placeholder="Title"
                                                        value={block.title}
                                                        onChange={(e) => handleIconBlockChange(index, e)}
                                                        required
                                                    />

                                                    {/* Description */}
                                                    <input
                                                        type="text"
                                                        name="description"
                                                        placeholder="Description"
                                                        value={block.description}
                                                        onChange={(e) => handleIconBlockChange(index, e)}
                                                        required
                                                    />

                                                    <div>
                                                        {/* Remove button */}
                                                        {formData.IconBlocks.length > 1 && (
                                                            <button
                                                                type="button"
                                                                onClick={() => handleRemoveIconBlock(index)}
                                                                className="button cancel-button"
                                                                style={{ marginLeft: '10px' }}
                                                            >
                                                                Remove
                                                            </button>
                                                        )}
                                                    </div>


                                                </div>
                                            ))}

                                            {/* Add New Icon Block */}
                                            <button
                                                type="button"
                                                onClick={handleAddIconBlock}
                                                className="button"
                                            >
                                                + Add Icon Block
                                            </button>
                                        </td>
                                    </tr>

                                    {isEditMode && (
                                        <tr>
                                            <td colSpan="2">
                                                <label htmlFor="Status">Status:</label>
                                                <select
                                                    name="Status"
                                                    value={formData.Status}
                                                    onChange={handleInputChange}
                                                    required
                                                >
                                                    <option value="Active">Active</option>
                                                    <option value="Inactive">Inactive</option>
                                                </select>
                                            </td>
                                        </tr>
                                    )}

                                    <tr>
                                        <td>
                                            <button type="submit" className="button">
                                                {isEditMode ? 'Update' : 'Submit'}
                                            </button>
                                            <button
                                                type="button"
                                                className="button cancel-button"
                                                onClick={handleCancel}
                                            >
                                                Cancel
                                            </button>
                                        </td>
                                    </tr>

                                </tbody>
                            </table>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UspsForm;
