import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getAllsectionsforwebsite } from '../../../Services/HomepageSectionService';
import './Homecollection.css'
import Productcard from '../Productcard/Productcard'

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
  {(() => {
    let counter = 1; // Initialize a counter variable
    return section.ItemsData.map((item) => (
      <div key={item._id} >
        {section.SectionType === 'Product' && (
          <div className='collection-display-main-wrapper'>
          <Productcard
     key={item._id}
     product={item}                                  
 />  
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
          <div className="section-item" id={`section-item_Subcategory_${counter++}`}>
            <Link to={`/collections/${item.Slug}`}>
              <img src={item.label_image} alt={item.Name} />
            </Link>
            <Link to={`/collections/${item.Slug}`}>
              <p>{item.Name}</p>
            </Link>
          </div>
        )}
      </div>
    ));
  })()}





</div>



                </div>
            ))}
        </div>

    );
};

export default HomePageCollections;
