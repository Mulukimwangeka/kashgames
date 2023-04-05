import React, { useEffect, useState } from 'react';
import { NavLink, useParams } from 'react-router-dom';
import './Styles/header.css';
import Category from './category';

function Header() {
  const [categories, setCategories] = useState([]);
  const { category } = useParams();

  useEffect(() => {
    const fetchCategories = async () => {
      const response = await fetch('https://fakestoreapi.com/products/categories');
      const data = await response.json();
      setCategories(data);
    };

    fetchCategories();
  }, []);

  return (
    <>
      <header className="header">
        <div className="container">
          <div className="header__brand">
            <h1 className="header__brand-name">Kashgames</h1>
          </div>
          
          <nav className="header__nav">
            <ul className="header__nav-menu">
              <li className="header__nav-item">
                <NavLink exact to="/" className="header__nav-link" activeClassName="active">All Games</NavLink>
              </li>
              {categories.map((category) => (
                <li className="header__nav-item" key={category}>
                  <NavLink to={`/category/${category}`} className="header__nav-link" activeClassName="active">{category}</NavLink>
                </li>
              ))}
            </ul>
          </nav>
          
          
        </div>
      </header>

      {category ? <Category /> : null}
    </>
  );
}

export default Header;
