import React from 'react';
import './ProductItem.css';

// Missing memoization
// Console logs
// State updates causing re-renders

function ProductItem({ product }) {
  console.log('[DEBUG] ProductItem rendered for:', product.name);
  
  // Missing memoization - component re-renders on every parent render
  // State updates in parent cause unnecessary re-renders
  
  // Missing memoization - formattedPrice recalculated on every render
  const formattedPrice = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  }).format(product.price);
  
  // Missing memoization - imageUrl recalculated
  const imageUrl = product.image || `https://via.placeholder.com/300x300?text=${product.name}`;
  
  return (
    <div className="product-item">
      <div className="product-image-container">
        <img 
          src={imageUrl} 
          alt={product.name}
          className="product-image"
          loading="lazy"
        />
      </div>
      <div className="product-info">
        <h3 className="product-name">{product.name}</h3>
        <p className="product-description">{product.description}</p>
        <div className="product-footer">
          <span className="product-price">{formattedPrice}</span>
          <span className="product-category">{product.category}</span>
        </div>
      </div>
    </div>
  );
}

export default ProductItem;

