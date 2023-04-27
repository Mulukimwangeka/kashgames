import React, { useEffect, useState } from 'react';
import { NavLink, useParams } from 'react-router-dom';
import './Styles/header.css';
import { baseUrl } from './util/commonutil';
import Category from './category';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';


function Header() {
  const [categories, setCategories] = useState([]);
  const { categoryId } = useParams();
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  useEffect(() => {
    const fetchCategories = async () => {
      const apiEndpoint = '/api/v1/categories/all';
      const fullEndpoint = `${baseUrl}${apiEndpoint}`;
      const config = {
        headers: {
          "ngrok-skip-browser-warning": "69420",
        },
      };
      const response = await fetch(fullEndpoint, config);
      const data = await response.json();
      setCategories(data);
    };

    fetchCategories();
  }, []);

  const toggleMobileMenu = () => {
    setShowMobileMenu(!showMobileMenu);
  };

  const handleCategoryClick = (categoryId) => {
    setShowMobileMenu(false); 
  };

  const handleLogout = () => {
    sessionStorage.removeItem('phoneNumber');
    window.alert('You have been logged out. Please re-enter your phone number to log in again.');
  };
  
 
  

  return (
    <>
      <header className="header">
      <button className="header__logout-button" onClick={handleLogout}>
        <FontAwesomeIcon icon={faSignOutAlt} />
        <span>Logout</span>
    </button>
        <div className="container">
          <div className="header__brand">
            <h1 className="header__brand-name">KashGames</h1>
          </div>
          

        
        </div>
        
      </header>
      <div>
        <button
          className="header__mobile-menu-btn"
          onClick={toggleMobileMenu}
        >
          {showMobileMenu ? 'Exit' : 'Categories of Games ☰ '}
        </button>
        
      </div>

      <nav className="header__nav">
        <div className="container">
          <ul className="header__nav-menu">
            <li className="header__nav-item">
              <NavLink to="/" className="header__nav-link" >All Games</NavLink>
            </li>
            {categories.map((category) => (
              <li className="header__nav-item" key={category.id}>
                <NavLink 
                  to={`/category/${category.id}`} 
                  className="header__nav-link" 
                  onClick={() => handleCategoryClick(category.id)}
                >
                  {category.title}
                </NavLink>
              </li>
            ))}
          </ul>
          
        </div>
      </nav>

      {showMobileMenu && (
        <nav className="header__mobile-nav">
          <ul className="header__mobile-nav-menu">
            <li className="header__mobile-nav-item">
              <NavLink
                to="/"
                className="header__mobile-nav-link"
                onClick={toggleMobileMenu}
              >
                All Games
              </NavLink>
            </li>
            {categories.map((category) => (
              <li className="header__mobile-nav-item" key={category.id}>
                <NavLink
                  to={`/category/${category.id}`}
                  className="header__mobile-nav-link"
                  onClick={() => handleCategoryClick(category.id)}
                >
                  {category.title}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      )}

      {categoryId ? <Category categoryId={categoryId} /> : null}
    </>
  );
}

export default Header;
