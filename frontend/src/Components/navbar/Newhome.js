import React, { useEffect } from 'react';
import './Newhome.css'

const Newhome = () => {

  useEffect(() => {
    const menu = document.querySelector('.menu');
    const menuMain = menu.querySelector('.menu-main');
    const goBack = menu.querySelector('.go-back');
    const menuTrigger = document.querySelector('.mobile-menu-trigger');
    const closeMenu = menu.querySelector('.mobile-menu-close');
    let subMenu;

    const handleMenuMainClick = (e) => {
      if (!menu.classList.contains('active')) {
        return;
      }
      if (e.target.closest('.menu-item-has-children')) {
        const hasChildren = e.target.closest('.menu-item-has-children');
        showSubMenu(hasChildren);
      }
    };

    const handleGoBackClick = () => {
      hideSubMenu();
    };

    const handleMenuTriggerClick = () => {
      toggleMenu();
    };

    const handleCloseMenuClick = () => {
      toggleMenu();
    };

    const handleOverlayClick = () => {
      toggleMenu();
    };

    function toggleMenu() {
      menu.classList.toggle('active');
      document.querySelector('.menu-overlay').classList.toggle('active');
    }

    function showSubMenu(hasChildren) {
      subMenu = hasChildren.querySelector('.sub-menu');
      subMenu.classList.add('active');
      subMenu.style.animation = 'slideLeft 0.5s ease forwards';
      const menuTitle = hasChildren.querySelector('i').parentNode.childNodes[0].textContent;
      menu.querySelector('.current-menu-title').innerHTML = menuTitle;
      menu.querySelector('.mobile-menu-head').classList.add('active');
    }

    function hideSubMenu() {
      subMenu.style.animation = 'slideRight 0.5s ease forwards';
      setTimeout(() => {
        subMenu.classList.remove('active');
      }, 300);
      menu.querySelector('.current-menu-title').innerHTML = '';
      menu.querySelector('.mobile-menu-head').classList.remove('active');
    }

    window.onresize = function () {
      if (this.innerWidth > 991) {
        if (menu.classList.contains('active')) {
          toggleMenu();
        }
      }
    };

    // Event listeners
    menuMain.addEventListener('click', handleMenuMainClick);
    goBack.addEventListener('click', handleGoBackClick);
    menuTrigger.addEventListener('click', handleMenuTriggerClick);
    closeMenu.addEventListener('click', handleCloseMenuClick);
    document.querySelector('.menu-overlay').addEventListener('click', handleOverlayClick);

    // Cleanup event listeners on component unmount
    return () => {
      menuMain.removeEventListener('click', handleMenuMainClick);
      goBack.removeEventListener('click', handleGoBackClick);
      menuTrigger.removeEventListener('click', handleMenuTriggerClick);
      closeMenu.removeEventListener('click', handleCloseMenuClick);
      document.querySelector('.menu-overlay').removeEventListener('click', handleOverlayClick);
    };
  }, []);


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
      {/* menu start here */}
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
            <li>
              <a href="/">Home</a>
            </li>
            <li className="menu-item-has-children">
              <a href="#">
                New <i className="fa fa-angle-down" />
              </a>
              <div className="sub-menu mega-menu mega-menu-column-4">
                <div className="list-item text-center">
                  <a href="#">
                    <img
                      src="https://th.bing.com/th/id/R.ce8de1adaa3fcc169f0d97c436b8274b?rik=6W1qX6Qp03lNWg&riu=http%3a%2f%2fimages.unsplash.com%2fphoto-1504633273314-6a929fcd7090%3fixlib%3drb-0.3.5%26q%3d80%26fm%3djpg%26crop%3dentropy%26cs%3dtinysrgb%26w%3d1080%26fit%3dmax%26ixid%3deyJhcHBfaWQiOjEyMDd9%26s%3de8e0ff2cce3792a276fa84086113a17c&ehk=chx16tzqSRzpfA6BYM4FNaZZ%2fMJwEtxaqHPW1FZb9FI%3d&risl=&pid=ImgRaw&r=0"
                      alt="Fashion"
                    />
                    <h4 className="title">Fashion</h4>
                  </a>
                </div>
                <div className="list-item text-center">
                  <a href="#">
                    <img
                      src="https://img.freepik.com/free-photo/male-technician-repairing-computer-motherboard-wooden-desk_23-2147923493.jpg?w=740&t=st=1671765056~exp=1671765656~hmac=4c8dffc9558819b4c21b126aaa394150f48adc3be9c8004c0b65d0420709ec00"
                      alt="Electronics"
                    />
                    <h4 className="title">Electronics</h4>
                  </a>
                </div>
                <div className="list-item text-center">
                  <a href="#">
                    <img
                      src="https://images.unsplash.com/photo-1571380401583-72ca84994796?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=764&q=80"
                      alt="Mobiles"
                    />
                    <h4 className="title">Mobiles</h4>
                  </a>
                </div>
                <div className="list-item text-center">
                  <a href="#">
                    <img
                      src="https://images.unsplash.com/photo-1578643463396-0997cb5328c1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=736&q=80"
                      alt="Appliances"
                    />
                    <h4 className="title">Appliances</h4>
                  </a>
                </div>
              </div>
            </li>
            <li className="menu-item-has-children">
              <a href="#">
                Shop <i className="fa fa-angle-down" />
              </a>
              <div className="sub-menu mega-menu mega-menu-column-4">
                <div className="list-item">
                  <h4 className="title">Men's Fashion</h4>
                  <ul>
                    <li>
                      <a href="#">T-Shirts</a>
                    </li>
                    <li>
                      <a href="#">Jeans</a>
                    </li>
                    <li>
                      <a href="#">Suit</a>
                    </li>
                    <li>
                      <a href="#">Kurta</a>
                    </li>
                    <li>
                      <a href="#">Watch</a>
                    </li>
                  </ul>
                  <h4 className="title">Beauty</h4>
                  <ul>
                    <li>
                      <a href="#">Moisturizer</a>
                    </li>
                    <li>
                      <a href="#">Face powder</a>
                    </li>
                    <li>
                      <a href="#">Lipstick</a>
                    </li>
                  </ul>
                </div>
                <div className="list-item">
                  <h4 className="title">Women's Fashion</h4>
                  <ul>
                    <li>
                      <a href="#">Sarees</a>
                    </li>
                    <li>
                      <a href="#">Sandals</a>
                    </li>
                    <li>
                      <a href="#">Watchs</a>
                    </li>
                    <li>
                      <a href="#">Shoes</a>
                    </li>
                  </ul>
                  <h4 className="title">Furniture</h4>
                  <ul>
                    <li>
                      <a href="#">Chairs</a>
                    </li>
                    <li>
                      <a href="#">Tables</a>
                    </li>
                    <li>
                      <a href="#">Doors</a>
                    </li>
                    <li>
                      <a href="#">Bed</a>
                    </li>
                  </ul>
                </div>
                <div className="list-item">
                  <h4 className="title">Home, Kitchen</h4>
                  <ul>
                    <li>
                      <a href="#">Kettle</a>
                    </li>
                    <li>
                      <a href="#">Toaster</a>
                    </li>
                    <li>
                      <a href="#">Dishwasher</a>
                    </li>
                    <li>
                      <a href="#">Microwave oven</a>
                    </li>
                    <li>
                      <a href="#">Pitcher</a>
                    </li>
                    <li>
                      <a href="#">Blender</a>
                    </li>
                    <li>
                      <a href="#">Colander</a>
                    </li>
                    <li>
                      <a href="#">Tureen</a>
                    </li>
                    <li>
                      <a href="#">Cookware</a>
                    </li>
                  </ul>
                </div>
                <div className="list-item">
                  <img
                    src="https://images.unsplash.com/photo-1549497538-303791108f95?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=761&q=80"
                    alt="Chair"
                  />
                </div>
              </div>
            </li>
            <li className="menu-item-has-children">
              <a href="#">
                Blog <i className="fas fa-angle-down" />
              </a>
              <div className="sub-menu single-column-menu">
                <ul>
                  <li>
                    <a href="#">Standard Layout</a>
                  </li>
                  <li>
                    <a href="#">Grid Layout</a>
                  </li>
                  <li>
                    <a href="#">single Post Layout</a>
                  </li>
                </ul>
              </div>
            </li>
            <li className="menu-item-has-children">
              <a href="#">
                Pages <i className="fas fa-angle-down" />
              </a>
              <div className="sub-menu single-column-menu">
                <ul>
                  <li>
                    <a href="#">Login</a>
                  </li>
                  <li>
                    <a href="#">Register</a>
                  </li>
                  <li>
                    <a href="#">Faq</a>
                  </li>
                  <li>
                    <a href="#">404 Page</a>
                  </li>
                </ul>
              </div>
            </li>
            <li>
              <a href="#">Contact</a>
            </li>
          </ul>
        </nav>
      </div>
      {/* menu end here */}
      <div className="header-item item-right">
        <a href="#">
          <i className="fas fa-search" />
        </a>
        <a href="#">
          <i className="far fa-heart" />
        </a>
        <a href="#">
          <i className="fas fa-shopping-cart" />
        </a>
        {/* mobile menu trigger */}
        <div className="mobile-menu-trigger">
          <span />
        </div>
      </div>
    </div>
  </div>
</header>

</>

  )
}

export default Newhome