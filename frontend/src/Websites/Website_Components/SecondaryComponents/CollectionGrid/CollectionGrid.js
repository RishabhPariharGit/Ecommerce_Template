import React, { useState,useRef,useEffect } from 'react';
import './CollectionGrid.css';
import {getAllSubCategoriesByCategorySlug} from '../../../../Services/WebsiteServices/AllServices/SubCategoryService';
export default function CollectionGrid() {

  const [collectionImages, setCollectionImages] = useState([
    
  ]);
const isFetchedRef = useRef(false);

useEffect(() => {
    if (!isFetchedRef.current) {
      const fetchSubCategory = async () => {
        try {
          const response = await getAllSubCategoriesByCategorySlug("summer-collection");
  
          if (response?.data) {
            const allImages = response.data;
  
            // 👉 Filter images where Show_In_Colletion_Grid is true
            const filteredImages = allImages.filter(item => item.Show_In_Colletion_Grid);
  
            if (filteredImages.length === 0) {
              setCollectionImages([]);
              return;
            }
  
            // 👉 Find the first image where ISLandscape is true
            const landscapeImage = filteredImages.find(item => item.ISLandscape);
  
            let selectedImages = [];
  
            if (landscapeImage) {
              // Remove the landscape image temporarily from the list
              const restImages = filteredImages.filter(item => item._id !== landscapeImage._id);
  
              // Pick 4 more images
              selectedImages = restImages.slice(0, 4);
  
              // 👉 Insert landscape image at position 1 (second place)
              selectedImages.splice(1, 0, landscapeImage);
            } else {
              // If no landscape image, just take first 5 normally
              selectedImages = filteredImages.slice(0, 5);
            }
  
            // 👉 Assign class names
            const classNames = [
              'collection-display-one',
              'collection-display-two',
              'collection-display-three',
              'collection-display-four',
              'collection-display-five',
            ];
  
            const finalImages = selectedImages.map((item, index) => ({
              ...item,
              className: classNames[index] || '',
            }));
  
            setCollectionImages(finalImages);
  
          } else {
            setCollectionImages([]);
          }
        } catch (err) {
          console.error('Error fetching product:', err);
          alert('Failed to fetch product. Please try again.');
        }
      };
  
      fetchSubCategory();
      isFetchedRef.current = true;
    }
  }, []);
  
  



  return (
    <div className="main-collection-grid-mn-wrpr">
      <div className="main-heading-collection-grid">
        <h2>April Top Categories</h2>
      </div>
      <div className="main-collection-grid-primary-wrapper">
      {collectionImages.map((item, index) => (
  <div key={item.id || index} className={`${item.className} ${item.isLandscape ? 'landscape-image' : ''}`}>
    <img src={item.label_image} alt={`Collection ${item.id}`} />
  </div>
))}

      </div>
    </div>
  );
}
