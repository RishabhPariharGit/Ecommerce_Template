import React, { createContext, useState, useEffect } from 'react';
import { getWishlistCount } from '../Services/WebsiteServices/AllServices//WishlistService';
import Cookies from 'js-cookie';

export const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
    const [wishlistCount, setwishlistCount] = useState(0);


  const fetchWishlistCount = async () => {
    const token = Cookies.get('token');
    const guid = Cookies.get('guid');

    if (!token && !guid) return;

    try {
      const headers = {};
      if (token) headers.Authorization = `Bearer ${token}`;
      if (guid) headers['x-anonymous-id'] = guid;

      const res = await getWishlistCount(headers);
      setwishlistCount(res?.data || 0);
    } catch (error) {
      console.error('Error fetching Wishlist count', error);
    }
  };

  useEffect(() => {
    fetchWishlistCount();
  }, []);

  return (
    <WishlistContext.Provider value={{ wishlistCount, fetchWishlistCount }}>
      {children}
    </WishlistContext.Provider>
  );
};
