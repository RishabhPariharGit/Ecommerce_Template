import React, { createContext, useState, useEffect } from 'react';
import { getCartItemsCount } from '../Services/WebsiteServices/AllServices/AddToCartService';
import Cookies from 'js-cookie';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartCount, setCartCount] = useState(0);

  const fetchCartCount = async () => {
    const token = Cookies.get('token');
    const guid = Cookies.get('guid');

    if (!token && !guid) return;

    try {
      const headers = {};
      if (token) headers.Authorization = `Bearer ${token}`;
      if (guid) headers['x-anonymous-id'] = guid;

      const res = await getCartItemsCount(headers);
      setCartCount(res?.data || 0);
    } catch (error) {
      console.error('Error fetching cart count', error);
    }
  };

  useEffect(() => {
    fetchCartCount();
  }, []);

  return (
    <CartContext.Provider value={{ cartCount, fetchCartCount }}>
      {children}
    </CartContext.Provider>
  );
};
