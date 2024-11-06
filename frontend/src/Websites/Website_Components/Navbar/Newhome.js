import React, { useEffect, useState } from 'react';
import './Newhome.css';
import { getAllCategories } from '../../../Services/CategoryService';
import { Link, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

const Newhome = () => {
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await getAllCategories();
        setCategories(response.data);
      } catch (err) {
        console.error('Error fetching categories:', err);
      }
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    const menu = document.querySelector('.menu');
    const menuMain = menu?.querySelector('.menu-main');
    const goBack = menu?.querySelector('.go-back');
    const menuTrigger = document.querySelector('.mobile-menu-trigger');
    const closeMenu = menu?.querySelector('.mobile-menu-close');
    const menuOverlay = document.querySelector('.menu-overlay');
    let subMenu;

    if (!menu || !menuMain || !goBack || !menuTrigger || !closeMenu || !menuOverlay) {
      console.warn('Some elements were not found in the DOM.');
      return;
    }

    const handleMenuMainClick = (e) => {
      if (!menu.classList.contains('active')) return;
      const hasChildren = e.target.closest('.menu-item-has-children');
      if (hasChildren) showSubMenu(hasChildren);
    };

    const toggleMenu = () => {
      menu.classList.toggle('active');
      menuOverlay.classList.toggle('active');
    };

    const showSubMenu = (hasChildren) => {
      subMenu = hasChildren.querySelector('.sub-menu');
      subMenu.classList.add('active');
      subMenu.style.animation = 'slideLeft 0.5s ease forwards';
      const menuTitle = hasChildren.querySelector('a').textContent;
      menu.querySelector('.current-menu-title').innerHTML = menuTitle;
      menu.querySelector('.mobile-menu-head').classList.add('active');
    };

    const hideSubMenu = () => {
      if (subMenu) {
        subMenu.style.animation = 'slideRight 0.5s ease forwards';
        setTimeout(() => {
          subMenu.classList.remove('active');
        }, 300);
      }
      menu.querySelector('.current-menu-title').innerHTML = '';
      menu.querySelector('.mobile-menu-head').classList.remove('active');
    };

    menuMain.addEventListener('click', handleMenuMainClick);
    goBack.addEventListener('click', hideSubMenu);
    menuTrigger.addEventListener('click', toggleMenu);
    closeMenu.addEventListener('click', toggleMenu);
    menuOverlay.addEventListener('click', toggleMenu);

    return () => {
      menuMain.removeEventListener('click', handleMenuMainClick);
      goBack.removeEventListener('click', hideSubMenu);
      menuTrigger.removeEventListener('click', toggleMenu);
      closeMenu.removeEventListener('click', toggleMenu);
      menuOverlay.removeEventListener('click', toggleMenu);
    };
  }, []);

  const handleLoginClick = () => {
    navigate('/login');
  };
  const handleAddtocartclick = () => {
    debugger;
    const token = Cookies.get('token');  
    // If token exists, navigate to the cart page; otherwise, navigate to login
    if (token) {
      navigate('/Checkout/cart'); // Redirect to the cart if the user is logged in
    } else {
      navigate('/login'); // Redirect to login if no token is found
    }
  };
  
  const handleLogout = () => {
    Cookies.remove('token'); // remove the token cookie
    Cookies.remove('role'); // remove the role cookie
    navigate('/login'); // redirect to login page
  };
  return (
    <>
      <header className="custom-header-cls">
        <div className="custom-container-cls">
          <div className="custom-roww v-center">
            <div className="header-item item-left">
              <div className="logo">
                <a href="#">Customlogo</a>
              </div>
            </div>
            <div className="header-item item-center">
              <div className="menu-overlay" />
              <nav className="menu">
                <div className="mobile-menu-head">
                  <div className="go-back">
                    <i className="fa fa-angle-left" />
                  </div>
                  <div className="current-menu-title" />
                  <div className="mobile-menu-close">×</div>
                </div>
                <ul className="menu-main">
                  {categories.map((category) => (
                    <li key={category._id} className="menu-item-has-children">
                      <Link to={`/collections/${category.Slug}`}>{category.Name}</Link>
                      <div className="sub-menu">
                        <ul>
                          {category.subcategories.map((sub) => (
                            <li key={sub._id}>
                              <Link to={`/collections/${sub.Slug}`}>{sub.Name}</Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>
            <div className="header-item item-right">
              <a href="#"><i className="fas fa-search" /></a>
              <a href="#"><i className="far fa-heart" /></a>
              <a href="#"><i className="fas fa-shopping-cart" /></a>
              <div className="mobile-menu-trigger"><span /></div>
            </div>
            <div>
            <button className='btn' onClick={handleAddtocartclick}>Addtocart</button>
            <button className='btn' onClick={handleLoginClick}>Wishlist</button>
            <button className='btn' onClick={handleLoginClick}>UserProfile</button>
              <button className='btn' onClick={handleLoginClick}>Login</button>
              <button className='btn' onClick={handleLogout}>Logout</button>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Newhome;
