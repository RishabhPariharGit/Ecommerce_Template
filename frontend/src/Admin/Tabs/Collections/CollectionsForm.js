import React, { useState, useEffect, useRef } from 'react';
import { getAllSubCategories } from '../../../Services/AdminServices/Allservices/SubCategoryService';
import { getAllProducts } from '../../../Services/AdminServices/Allservices/ProductService';
import {
    addCollection,
    updateCollection,
    getCollectionById
} from '../../../Services/AdminServices/Allservices/CollectionService';
import '../../AdminStyle/AdminGlobalStyle.css';
import { useNavigate, useParams } from 'react-router-dom';
import Select from 'react-select';
import { toast } from 'react-toastify';
import ProductSelectionTable from './ProductSelectionTable';


const CollectionsForm = ({ isEditMode = false }) => {

    const [formData, setFormData] = useState({
        Name: '',
        Description: '',
        SubcategoryId: [],
        ProductId: [],
        Show_InHomepage: false,
        Show_InProductpage: false,
        Add_collections: false,
        Status: '',
        Add_Products: false,
    });
    const [SubCategories, setSubCategories] = useState([]);

    const [Products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const { Id } = useParams();
    const navigate = useNavigate();
    const isFetchedRef = useRef(false); // Track if data has already been fetched

    // Fetch subcategories and products on load
    useEffect(() => {
        const fetchSubCategories = async () => {
            try {
                const response = await getAllSubCategories();
                if (response.data) {
                    setSubCategories(response.data);
                } else {
                    setSubCategories([]);
                }
            } catch (err) {
                console.error('Error fetching subcategories:', err);
            }
        };

        const fetchProducts = async () => {
            try {
                const response = await getAllProducts();
                if (response.data) {
                    console.log("Products", response.data)
                    setProducts(response.data);
                } else {
                    setProducts([]);
                }
            } catch (err) {
                console.error('Error fetching products:', err);
            }
        };

        fetchSubCategories();
        fetchProducts();

        if (isEditMode && Id) {
            const fetchData = async () => {
                try {
                    const response = await getCollectionById(Id);
                    const collection = response.data;
                    setFormData({
                        Name: collection.Name,
                        Description: collection.Description,
                        SubcategoryId: collection.SubcategoryId,
                        ProductId: collection.ProductId,
                        Show_InHomepage: collection.Show_InHomepage,
                        Show_InProductpage: collection.Show_InProductpage,
                        Add_collections: collection.Add_collections,
                        Status: collection.Status,
                        Add_Products: collection.Add_Products,
                    });

                    isFetchedRef.current = true; // Mark as fetched
                } catch (err) {
                    console.error('Error fetching collection data:', err);
                } finally {
                    setIsLoading(false);
                }
            };

            fetchData();
        } else {
            setIsLoading(false);
        }

    }, [isEditMode, Id]);

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;

        // handle mutual uncheck logic
        if (name === 'Add_collections' && checked) {
            setFormData((prevData) => ({
                ...prevData,
                [name]: checked,
                Add_Products: false, // uncheck Add_Products
                ProductId: [],       // clear selected products
            }));
        } else if (name === 'Add_Products' && checked) {
            setFormData((prevData) => ({
                ...prevData,
                [name]: checked,
                Add_collections: false, // uncheck Add_collections
                SubcategoryId: [],      // clear selected subcategories
            }));
        } else {
            setFormData((prevData) => ({
                ...prevData,
                [name]: type === 'checkbox' ? checked : value,
            }));
        }
    };




    const handleSubmitFile = async (e) => {
        e.preventDefault();

        if (!formData.Name) {
            toast.error('Please enter a name.');
            return;
        }

        try {
            const response = isEditMode
                ? await updateCollection(Id, formData)
                : await addCollection(formData);

            if (response && response.data) {
                toast.success(response.message);
                setTimeout(() => {
                    navigate('/admin/Collections');
                }, 3500); // Wait for 3 seconds
            } else {
                toast.error(response.message);
            }
        } catch (err) {
            console.error('Error submitting form:', err);
            toast.error('Failed to submit the form. Please try again.');
        }
    };

    const handleCancel = () => {
        navigate('/admin/SubCategory');
    };

    if (isLoading) return <div>Loading...</div>;

    // Options for subcategories and products
    const subcategoryOptions = SubCategories.map(sub => ({
        value: sub._id,
        label: sub.Name,
    }));



    return (
        <>
            <div className="pagetitle">
                {isEditMode ? 'Edit Collection' : 'Create a New Collection'}
            </div>
            <div className="form-800">
                <div className="white-bg">
                    <div className="input-form">
                        <form onSubmit={handleSubmitFile}>
                            <table>
                                <tbody>
                                    <tr>
                                        <td>
                                            <div className="formlabel">Name</div>
                                            <input
                                                type="text"
                                                name="Name"
                                                placeholder="Collection Name"
                                                value={formData.Name}
                                                onChange={handleInputChange}
                                                required
                                            />
                                        </td>

                                    </tr>
                                    <tr>
                                        <td colSpan="2">
                                            <div className="formlabel">Description</div>
                                            <textarea
                                                name="Description"
                                                placeholder="Collection Description"
                                                value={formData.Description}
                                                onChange={handleInputChange}
                                            />
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <div className="d-flex align-items-center gap-2">
                                                <input
                                                    type="checkbox"
                                                    name="Show_InHomepage"
                                                    checked={formData.Show_InHomepage}
                                                    onChange={handleInputChange}
                                                />
                                                <div className="formlabel">Add In Home Page</div>
                                            </div>
                                        </td>
                                        <td>
                                            <div className="d-flex align-items-center gap-2">
                                                <input
                                                    type="checkbox"
                                                    name="Show_InProductpage"
                                                    checked={formData.Show_InProductpage}
                                                    onChange={handleInputChange}
                                                />
                                                <div className="formlabel">Add In Product Page</div>
                                            </div>
                                        </td>
                                    </tr>

                                    <tr>
                                        <td>
                                            <div className="d-flex align-items-center gap-2 mb-2">
                                                <input
                                                    type="checkbox"
                                                    name="Add_collections"
                                                    checked={formData.Add_collections}
                                                    onChange={handleInputChange}
                                                />
                                                <div className="formlabel">Add Collections</div>
                                            </div>

                                            {formData.Add_collections && (
                                                <Select
                                                    isMulti
                                                    options={subcategoryOptions}
                                                    value={subcategoryOptions.filter(option =>
                                                        formData.SubcategoryId.includes(option.value)
                                                    )}
                                                    onChange={(selectedOptions) =>
                                                        setFormData({
                                                            ...formData,
                                                            SubcategoryId: selectedOptions.map(option => option.value),
                                                        })
                                                    }
                                                    className="basic-multi-select"
                                                    classNamePrefix="select"
                                                    placeholder="Select Subcategories"
                                                />

                                            )}
                                        </td>
                                    </tr>

                                    <tr>
                                        <td>
                                            <div className="d-flex align-items-center gap-2 mb-2">
                                                <input
                                                    type="checkbox"
                                                    name="Add_Products"
                                                    checked={formData.Add_Products}
                                                    onChange={handleInputChange}
                                                />
                                                <div className="formlabel">Add Products</div>
                                            </div>

                                            {formData.Add_Products && (
                                                <div className="product-list-section">
                                                    {/* Search field removed as ProductSelectionTable already has its own search */}
                                                    <ProductSelectionTable
                                                        Products={Products}
                                                        formData={formData}
                                                        setFormData={setFormData}
                                                    />
                                                </div>
                                            )}

                                        </td>
                                    </tr>


                                    <tr>
                                        <td>
                                            <div>
                                                <button
                                                    type="submit"
                                                    className="button"
                                                    disabled={isLoading}
                                                >
                                                    {isEditMode ? 'Update' : 'Submit'}
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
        </>
    );
};

export default CollectionsForm;
