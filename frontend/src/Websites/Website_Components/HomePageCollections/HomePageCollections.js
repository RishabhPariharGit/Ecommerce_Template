import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getAllsectionsforwebsite } from '../../../Services/HomepageSectionService';
import './Homecollection.css'

const HomePageCollections = () => {
    const [sections, setSections] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchSections = async () => {
            try {
                const response = await getAllsectionsforwebsite();
                console.log(response.data)
                setSections(response.data);
            } catch (error) {
                console.error('Error fetching homepage sections:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchSections();
    }, []);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (sections.length === 0) {
        return <div>No Homepage Sections Found</div>;
    }

    return (
        <div>
            {sections.map((section) => (
                <div key={section._id} className="homepage-section">
                    <h2>{section.Title}</h2>
                    <div className="section-items">
                        {section.ItemsData.map((item) => (
                            <div key={item._id} className="section-item">
                                {section.SectionType === 'Product' && (
                                    <div>
                                        <Link to={`/product/${item.Slug}`}>
                                            <img
                                                src={item.Product_Main_image}
                                                alt={item.Name}
                                            />
                                        </Link>
                                        <Link to={`/product/${item.Slug}`}>  <p>{item.Name}</p></Link>
                                      
                                    </div>
                                )}
                                {/* Category Section */}
                                {section.SectionType === 'Category' && (
                                    <div>
                                        <img src={item.label_image} alt={item.Name} />
                                        <p>{item.Name}</p>
                                    </div>
                                )}
                                {/* Subcategory Section */}
                                {section.SectionType === 'Subcategory' && (
                                    <div>
                                         <Link to={`/collections/${item.Slug}`}>
                                        <img src={item.label_image} alt={item.Name} /></Link>
                                        <Link to={`/collections/${item.Slug}`}>
                                        <p>{item.Name}</p>
                                        </Link>
                                    </div>
                                )}

                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </div>

    );
};

export default HomePageCollections;
