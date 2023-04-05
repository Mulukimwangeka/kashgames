import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './Styles/Category.css';

function Category() {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const { category } = useParams();

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await fetch(`https://fakestoreapi.com/products/category/${category}`);
      const data = await response.json();
      setProducts(data);
    };

    fetchProducts();
  }, [category]);

  const handlePlayClick = (product) => {
    setSelectedProduct(product);
  };

  const handleCloseClick = () => {
    setSelectedProduct(null);
  };

  const handlePayAndPlayClick = async () => {
    const phoneNumber = prompt('Please enter your phone number');
    if (phoneNumber && /^\d{10}$/.test(phoneNumber)) {
      console.log('Phone number:', phoneNumber);
      // Here you can add the code to handle the payment confirmation and fetch the game data
      // For example:
      try {
        const gameResponse = await fetch('https://fakegameapi.com/game');
        const gameData = await gameResponse.json();
        console.log('Game data:', gameData);
        // Once the game data is fetched, you can display it to the user or redirect to the game page
        // For example:
        // window.location.href = '/game?id=' + gameData.id;
      } catch (error) {
        console.error('Error fetching game data:', error);
        alert('Error fetching game data. Please try again later.');
      }
    } else {
      alert('Please enter a valid 10-digit phone number');
    }
  };

  return (
    <section className="category">
      <div className="container">
        <h2 className="category__title">{category}</h2>
        <div className="category__grid">
          {products.map((product) => (
            <div className="category__product" key={product.id}>
              <img src={product.image} alt={product.title} className="category__product-image" />
              <h3 className="category__product-title">{product.title}</h3>
              <button className="category__product-button" onClick={() => handlePlayClick(product)}>Play</button>
            </div>
          ))}
        </div>
        {selectedProduct && (
          <div className="category__modal">
            <div className="category__modal-content">
              <button className="category__modal-close" onClick={handleCloseClick}>X</button>
              <img src={selectedProduct.image} alt={selectedProduct.title} className="category__modal-image" />
              <div className="category__modal-details">
                <h3 className="category__modal-title">{selectedProduct.title}</h3>
                <p className="category__modal-description">{selectedProduct.description}</p>
              </div>
              <button className="category__modal-pay-and-play" onClick={handlePayAndPlayClick}>Pay & Play</button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

export default Category;
