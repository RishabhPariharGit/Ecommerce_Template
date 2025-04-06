import React, { useEffect, useState } from 'react';
import { ShoppingCartOutlined, FavoriteBorderOutlined, PersonOutline, LoginOutlined, LogoutOutlined } from '@mui/icons-material';
import './Navbar.css';
import { getAllCategoryforSite } from '../../../../Services/WebsiteServices/AllServices/CategoryService';
import { Link, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

const Navbar = () => {

  const [isDropdownVisible, setIsDropdownVisible] = useState(false);

  // Handle mouse enter and leave for the dropdown
  const handleMouseEnter = () => setIsDropdownVisible(true);
  const handleMouseLeave = () => setIsDropdownVisible(false);

  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await getAllCategoryforSite();
        console.log("response", response.data)
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

  const handleProfileClick = () => {
    navigate('/UserProfile');
  };
  const handleAddtocartclick = () => {
    navigate('/Checkout/cart');
  };
  const handleWishlistclick = () => {

    const token = Cookies.get('token');
    if (token) {
      navigate('/Wishlist');
    } else {
      navigate('/login');
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
                <Link to="/">Customlogo</Link>
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
                  {Array.isArray(categories) && categories.map((category) => (
                    <li key={category._id} className="menu-item-has-children">
                      <Link to={`/collections/${category.Slug}`}>{category.Name}</Link>
                      {Array.isArray(category.subcategories) && category.subcategories.length > 0 && (
                        <div className="sub-menu">
                          <ul>
                            {category.subcategories.map((sub) => (
                              <li key={sub._id}>
                                <Link to={`/collections/${sub.Slug}`}>{sub.Name}</Link>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </li>
                  ))}

                </ul>
              </nav>
            </div>
            <div className="header-item item-right">
              <div className='cstm-right-icons'>
                <button className="btn" onClick={handleAddtocartclick}>
                  <ShoppingCartOutlined /> {/* Outlined Cart Icon */}
                </button>
                <button className="btn" onClick={handleWishlistclick}>
                  <FavoriteBorderOutlined /> {/* Outlined Wishlist Icon */}
                </button>
                <div className="profile-dropdown-container">
                  <button className="btn profile-btn">
                    <PersonOutline /> {/* Outlined User Profile Icon */}
                  </button>
                  <div className="dropdown-menu">
                    <button className="dropdown-item" onClick={handleLoginClick}>
                      <LoginOutlined /> Login1
                    </button>
                    <button className="dropdown-item" onClick={handleLogout}>
                      <LogoutOutlined /> Logout
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Navbar;
