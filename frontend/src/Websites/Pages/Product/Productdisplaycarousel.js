// import { useState } from 'react';
// import './Productdisplaycarousel.css';

// const ProductImageGallery = ({ product }) => {
//   const [mainImage, setMainImage] = useState(product.Product_Main_image);

//   return (
//     <div>
//       {/* Main Product Image Wrapper */}
//       <div className="main-product-image-wrapper">
//         {mainImage ? (
//           <img
//             src={mainImage}
//             alt={`${product.Name || 'Product'} Main Image`}
//             className="main-product-image"
//           />
//         ) : (
//           <p>Main image not available</p>
//         )}
//       </div>

//       {/* Additional Product Images */}
//       <div className="product-images-wrapper">
//         {product.Product_image?.length > 0 ? (
//           product.Product_image.map((imageUrl, index) => (
//             <img
//               key={index}
//               src={imageUrl}
//               alt={`${product.Name || 'Product'} Image ${index + 1}`}
//               className="product-image"
//               onMouseEnter={() => setMainImage(imageUrl)} // Change the main image on hover
//               onMouseLeave={() => setMainImage(product.Product_Main_image)} // Reset to main image on mouse leave if desired
//             />
//           ))
//         ) : (
//           <p>No images available</p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default ProductImageGallery;
