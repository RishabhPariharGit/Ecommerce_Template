import React, { useState, useEffect, useRef } from 'react';
import { addPolicy, updatePolicy, getPolicyById } from '../../../../../Services/AdminServices/Allservices/PolicyService';
import '../../../../AdminStyle/AdminGlobalStyle.css';
import { useNavigate, useParams } from 'react-router-dom';

const PolicyForm = ({ isEditMode = false }) => {
    const [formData, setFormData] = useState({
        title: '',
        Slug:'',
        effectiveDate: '',
        sections: [{ heading: '', description: '', points: [''] }],
        status: 'Active'
    });


    const [isLoading, setIsLoading] = useState(true);
    const { Id } = useParams();
    const navigate = useNavigate();
    const isFetchedRef = useRef(false);

    useEffect(() => {
        if (!isFetchedRef.current) {
            const loadPolicy = async () => {
                try {
                    const response = await getPolicyById(Id);
                    if (!response.data) {
                        console.error('Privacy policy data not found');
                        return;
                    }

                    const policy = response.data;
                    setFormData({
                        title: policy.title,
                        Slug:policy.Slug,
                        effectiveDate: policy.effectiveDate ? policy.effectiveDate.substring(0, 10) : '',
                        sections: policy.sections.length ? policy.sections : [{ heading: '', description: '' }],
                        status: policy.audit.status
                    });
                } catch (err) {
                    console.error('Error fetching Privacy Policy:', err);
                } finally {
                    setIsLoading(false);
                }
            };

            if (isEditMode && Id) {
                loadPolicy();
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

    const handleSectionChange = (index, e) => {
        const { name, value } = e.target;
        const updatedSections = [...formData.sections];
        updatedSections[index][name] = value;
        setFormData((prev) => ({
            ...prev,
            sections: updatedSections
        }));
    };

    const handleAddSection = () => {
        setFormData((prev) => ({
            ...prev,
            sections: [...prev.sections, { heading: '', description: '', points: [''] }]
        }));
    };


    const handleRemoveSection = (index) => {
        const updatedSections = [...formData.sections];
        updatedSections.splice(index, 1);
        setFormData((prev) => ({
            ...prev,
            sections: updatedSections
        }));
    };

    const handlePointChange = (sectionIndex, pointIndex, e) => {
        const { value } = e.target;
        const updatedSections = [...formData.sections];
        updatedSections[sectionIndex].points[pointIndex] = value;
        setFormData(prev => ({
            ...prev,
            sections: updatedSections
        }));
    };

    const handleAddPoint = (sectionIndex) => {
        const updatedSections = [...formData.sections];
        updatedSections[sectionIndex].points.push('');
        setFormData(prev => ({
            ...prev,
            sections: updatedSections
        }));
    };

    const handleRemovePoint = (sectionIndex, pointIndex) => {
        const updatedSections = [...formData.sections];
        updatedSections[sectionIndex].points.splice(pointIndex, 1);
        setFormData(prev => ({
            ...prev,
            sections: updatedSections
        }));
    };

    const handleCancel = () => {
        navigate('/admin/Policies');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const payload = {
            title: formData.title,
            effectiveDate: formData.effectiveDate,
            sections: formData.sections,
            Slug: formData.Slug
        };

        if (isEditMode) {
            payload.status = formData.status;
        }

        let response;
        if (isEditMode) {
            response = await updatePolicy(Id, payload);
        } else {
            response = await addPolicy(payload);
        }

        if (response && response.data) {
            alert(response.message);
            navigate('/admin/Policies');
        } else {
            alert('Unexpected server response');
        }
    };

    if (isLoading) return <div>Loading...</div>;

    return (
        <div>
            <div className='pagetitle'>
                {isEditMode ? 'Edit Privacy Policy' : 'Create New Privacy Policy'}
            </div>

            <div className="form-800">
                <div className="white-bg">
                    <div className='input-form'>
                        <form onSubmit={handleSubmit}>
                            <table>
                                <tbody>
                                    <tr>
                                        <td colSpan="2">
                                            <div className="formlabel">Title</div>
                                            <input
                                                type="text"
                                                name="title"
                                                value={formData.title}
                                                onChange={handleInputChange}
                                                required
                                            />
                                        </td>
                                        <td colSpan="2">
                                            <div className="formlabel">Slug</div>
                                            <input
                                                type="text"
                                                name="Slug"
                                                value={formData.Slug}
                                                onChange={handleInputChange}
                                                required
                                            />
                                        </td>
                                    </tr>

                                    <tr>
                                        <td colSpan="2">
                                            <div className="formlabel">Effective Date</div>
                                            <input
                                                type="date"
                                                name="effectiveDate"
                                                value={formData.effectiveDate}
                                                onChange={handleInputChange}
                                                required
                                            />
                                        </td>
                                    </tr>

                                    <tr>
                                        <td colSpan="2">
                                            <div className="formlabel">Sections</div>
                                            {formData.sections.map((section, index) => (
                                                <div key={index} style={{ flexDirection: 'column', display: 'flex',gap:'10px'}}>
                                                    <input
                                                        type="text"
                                                        name="heading"
                                                        placeholder="Section Heading"
                                                        value={section.heading}
                                                        onChange={(e) => handleSectionChange(index, e)}
                                                        
                                                    />
                                                    <textarea
                                                        name="description"
                                                        placeholder="Section Description"
                                                        value={section.description}
                                                        onChange={(e) => handleSectionChange(index, e)}
                                                        
                                                    />

                                                    <div >
                                                        <strong>Points:</strong>
                                                        {section.points.map((point, pointIndex) => (
                                                            <div key={pointIndex} style={{ display: 'flex', marginTop: '5px', gap: '5px' }}>
                                                                <input
                                                                    type="text"
                                                                    value={point}
                                                                    onChange={(e) => handlePointChange(index, pointIndex, e)}
                                                                    placeholder={`Point ${pointIndex + 1}`}
                                                                />
                                                                {section.points.length > 1 && (
                                                                    <button
                                                                        type="button"
                                                                        className="button cancel-button"
                                                                        onClick={() => handleRemovePoint(index, pointIndex)}
                                                                    >
                                                                        X
                                                                    </button>
                                                                )}
                                                            </div>
                                                        ))}
                                                        <button
                                                            type="button"
                                                            className="button"
                                                            onClick={() => handleAddPoint(index)}
                                                            style={{ marginTop: '5px' }}
                                                        >
                                                            + Add Point
                                                        </button>
                                                    </div>

                                                    {formData.sections.length > 1 && (
                                                        <div>

                                                        
                                                        <button
                                                            type="button"
                                                            className="button cancel-button"
                                                            onClick={() => handleRemoveSection(index)}
                                                            style={{ marginTop: '10px' }}
                                                        >
                                                            Remove Section
                                                        </button>
                                                        </div>
                                                    )}
                                                </div>
                                            ))}

                                            <button
                                                type="button"
                                                className="button"
                                                onClick={handleAddSection}
                                            >
                                                + Add Section
                                            </button>
                                        </td>
                                    </tr>

                                    {isEditMode && (
                                        <tr>
                                            <td colSpan="2">
                                                <label>Status:</label>
                                                <select
                                                    name="status"
                                                    value={formData.status}
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

export default PolicyForm;
