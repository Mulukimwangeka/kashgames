import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './Styles/Category.css'

function Category() {
  const [products, setProducts] = useState([]);
  const { category } = useParams();

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await fetch(`https://fakestoreapi.com/products/category/${category}`);
      const data = await response.json();
      setProducts(data);
    };

    fetchProducts();
  }, [category]);

  return (
    <section className="category">
      <div className="container">
        <h2 className="category__title">{category}</h2>
        <div className="category__grid">
          {products.map((product) => (
            <div className="category__product" key={product.id}>
              <img src={product.image} alt={product.title} className="category__product-image" />
              <h3 className="category__product-title">{product.title}</h3>
              <p className="category__product-price">${product.price}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Category;
