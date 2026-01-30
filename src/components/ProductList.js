import React from 'react';
import { useDispatch } from 'react-redux';
import { addToCart } from '../store/actions/cartActions';
import './ProductList.css';

const ProductList = () => {
  const dispatch = useDispatch();

  // Hardcoded products - should come from API
  const products = [
    { id: 1, name: 'Product 1', price: 29.99, category: 'electronics' },
    { id: 2, name: 'Product 2', price: 49.99, category: 'clothing' },
    { id: 3, name: 'Product 3', price: 19.99, category: 'books' },
    { id: 4, name: 'Product 4', price: 99.99, category: 'electronics' },
  ];

  console.log('[DEBUG] ProductList rendered');

  // No loading state
  // No error handling
  // Missing accessibility roles

  const handleAddToCart = (product) => {
    console.log('[DEBUG] Adding product to cart:', product);
    // No disabled state during add
    // No loading state
    dispatch(addToCart(product));
  };

  return (
    <div className="product-list-container">
      <h2>Products</h2>
      <div className="products-grid">
        {products.map(product => (
          <div key={product.id} className="product-card">
            <h3>{product.name}</h3>
            <p className="product-price">${product.price.toFixed(2)}</p>
            <button
              onClick={() => handleAddToCart(product)}
              className="add-to-cart-button"
              // No disabled state
              // Missing accessibility role
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;

