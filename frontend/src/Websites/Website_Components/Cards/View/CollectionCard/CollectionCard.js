import React from 'react';
import { CiHeart } from "react-icons/ci";
import { Link } from 'react-router-dom';
import '../Productcard/Productcard.css';

const CollectionCard = ({
    product,
}) => {
    return (
        <div className='main-product-card-main-wrapper'>
            <div className='image-and-icons-main-wrapper'>
            <Link to={`/product/${product.Slug}`}>
                <img
                    src={product.Product_Main_image}
                    alt={product.Name}               
                />
                 </Link>
            </div>
            <div className='main-product-card-description-main-wrapper'>
            <Link to={`/product/${product.Slug}`}>
                <h2>{product.Name}</h2> </Link>
            </div>
        </div>
    );
};

export default CollectionCard;
