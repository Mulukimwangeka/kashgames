import React, { useEffect, useState } from 'react';
import { NavLink, useParams } from 'react-router-dom';
import './Styles/header.css';
import { baseUrl } from './util/commonutil';
import Category from './category';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';





function Header() {
  const [categories, setCategories] = useState([]);
  const { categoryId } = useParams();
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLoginPopup, setShowLoginPopup] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [logoutClicked, setLogoutClicked] = useState(false);



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

  const handleLogin = async () => {
    // Check if the phone number is subscribed
    const subscriberId = phoneNumber;
    try {
      const response = await axios.get(`${baseUrl}/api/v1/dailysubs/getsubs/${subscriberId}`, {
        headers: {
          'Content-Type': 'application/json',
          'ngrok-skip-browser-warning': '69420',
        },
      });
      

      const isSubscribed = response.data;
      if (isSubscribed) {
        setIsLoggedIn(true);
        setShowLoginPopup(false);
        sessionStorage.setItem('phoneNumber', phoneNumber); // Store the phone number in session storage
      } else {
        setErrorMessage('Phone number is not subscribed');
      }
    } catch (error) {
      console.error(error);
      setErrorMessage('An error occurred while checking the subscription status');
    }
  };
  
  const handleLogout = () => {
    sessionStorage.removeItem('phoneNumber');
    setLogoutClicked(true);
    setShowLoginPopup(false); // Close the login popup
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
      {logoutClicked && (
        <div className="overlay">
    <div className="popup">
      <h3>Please enter your phone number to Log In</h3>
      {errorMessage && <p className="popup__error">{errorMessage}</p>}
      <input
        type="text"
        placeholder="Phone number"
        value={phoneNumber}
        onChange={(event) => setPhoneNumber(event.target.value)}
      />
      <button onClick={handleLogin}>Log In</button>
      <button className="popup__close" onClick={() => setLogoutClicked(false)}>Close</button>

    </div>
  </div>
)}


    </>
  );
}

export default Header;