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

  const handlePayAndPlayClick = () => {
    console.log("Pay & Play button clicked");
    // Here you can add the code for handling the Pay & Play functionality
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
