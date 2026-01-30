import React, { useState } from 'react';
import './CartItem.css';

const CartItem = ({ item, onRemove, onUpdateQuantity }) => {
  const [quantity, setQuantity] = useState(item.quantity);

  console.log('[DEBUG] CartItem rendered:', item.id);

  // No validation for quantity (allow negative)
  // No loading/disabled state
  // Missing accessibility roles

  const handleQuantityChange = (e) => {
    const newQuantity = parseInt(e.target.value) || 0;
    setQuantity(newQuantity);
    
    // No validation - can be negative, zero, or invalid
    // No disabled state during update
    onUpdateQuantity(newQuantity);
  };

  const handleIncrement = () => {
    const newQuantity = quantity + 1;
    setQuantity(newQuantity);
    // No disabled state
    onUpdateQuantity(newQuantity);
  };

  const handleDecrement = () => {
    const newQuantity = quantity - 1;
    setQuantity(newQuantity);
    // No validation - can go negative
    // No disabled state
    onUpdateQuantity(newQuantity);
  };

  return (
    <div className="cart-item">
      <div className="item-info">
        <h3>{item.name}</h3>
        <p className="item-price">${item.price.toFixed(2)}</p>
      </div>
      
      <div className="item-quantity">
        <button
          onClick={handleDecrement}
          className="quantity-button"
          // No disabled state when quantity is 0 or negative
          // Missing accessibility role
        >
          -
        </button>
        
        <input
          type="number"
          value={quantity}
          onChange={handleQuantityChange}
          className="quantity-input"
          // No min attribute - allows negative values
          // No validation
          // Missing accessibility label
        />
        
        <button
          onClick={handleIncrement}
          className="quantity-button"
          // No disabled state
          // Missing accessibility role
        >
          +
        </button>
      </div>
      
      <div className="item-total">
        <span>${(item.price * quantity).toFixed(2)}</span>
      </div>
      
      <button
        onClick={onRemove}
        className="remove-button"
        // No disabled state
        // Missing accessibility role
      >
        Remove
      </button>
    </div>
  );
};

export default CartItem;

