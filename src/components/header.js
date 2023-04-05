import React from 'react';
// import Search from './search';
import './Styles/header.css'

function Header() {
  return (
    <header className="header">
      <div className="container">
        <div className="header__brand">
          <h1 className="header__brand-name">Kashgames</h1>
        </div>
        
        {/* <nav className="header__nav">
          <ul className="header__nav-menu">
            <li className="header__nav-item">
              <a href="/Gamelist" className="header__nav-link">Games</a>
            </li>
            <li className="header__nav-item">
              <a href="/category" className="header__nav-link">Categories</a>
            </li>
          </ul>
        </nav> */}
        {/* <div className="header__search">
        <Search/>
        </div> */}
      </div>
    </header>
  );
}

export default Header;
