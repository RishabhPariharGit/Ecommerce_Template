// components/ImageSlider.jsx
import React, { useRef, useEffect,useState } from "react";
import { useParams, useNavigate } from 'react-router-dom';
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import './ProductCardSlider.css';
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { Link } from "react-router-dom";
import {getAllSubCategoriesByCategorySlug} from '../../../../../Services/WebsiteServices/AllServices/SubCategoryService'
import Productcard from '../../View/Productcard/Productcard';
import Cookies from 'js-cookie';
import { v4 as uuidv4 } from 'uuid';

import { addProductToWishlist, getWishListItems } from '../../../../../Services/WebsiteServices/AllServices/WishlistService';
import { addProductToCart } from '../../../../../Services/WebsiteServices/AllServices/AddToCartService';
import CollectionCard from "../../View/CollectionCard/CollectionCard";
const CollectionCardSlider = ({ Slug }) => {
 

  const prevRef = useRef(null);
  const nextRef = useRef(null);
  const swiperRef = useRef(null);
  const navigate = useNavigate();
  const [products, setproducts] = useState([]);
  const isFetchedRef = useRef(false);
const [cartProductIds, setCartProductIds] = useState(new Set());
    const [wishlistedProductIds, setWishlistedProductIds] = useState(new Set());
    useEffect(() => {
      
        if (!isFetchedRef.current) {
            const fetchSubCategory = async () => {
                try {
                    const response = await getAllSubCategoriesByCategorySlug(Slug);
                    
                    if (response?.data) {
                      setproducts(response.data);
                    } else {
                      setproducts([]);
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
    <>
   
      <div className="main-slider-mn-wrpr">
     
      <div className="w-full max-w-4xl mx-auto main-slider-wrapper">
          <div className="flex justify-center mt-4 gap-4 main-btn-wrapper">

          <div className="main-heading-product-card-slider">
      <h2>Explore The Trending Collections</h2>
    </div>

<div className="main-product-card-slider-buttons">

          <button
            ref={prevRef}
            className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 transition previous-btn"
          >
              <ArrowBackIosNewIcon className="arrowbackcstmclss"/>
          </button>
          <button
            ref={nextRef}
            className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 transition next-btn"
          >
              <ArrowForwardIosIcon className="arrowforwardcstmclss"/>
          </button>
          </div>
        </div>
        
        <Swiper
          onSwiper={(swiper) => (swiperRef.current = swiper)}
          modules={[Navigation]}
          navigation={{
            prevEl: prevRef.current,
            nextEl: nextRef.current,
          }}
          pagination={{ clickable: true }}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          loop={false}
          spaceBetween={30}
          slidesPerView={4}
        >
          {products.map((product) => (
            <SwiperSlide className="Main-swiper-mn-wrapper-clctn" key={product._id}>
              <div className="w-full h-[400px] flex justify-center items-center bg-white rounded-xl shadow-md px-4">
                <CollectionCard
                                                  key={product._id}
                                                  product={product}
                                              />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

      
      </div>
      </div>
    </>
  );
};

export default CollectionCardSlider;
