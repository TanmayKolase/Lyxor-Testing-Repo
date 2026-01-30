import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart, updateQuantity, clearCart } from '../store/actions/cartActions';
import CartItem from './CartItem';
import './Cart.css';

const Cart = () => {
  const dispatch = useDispatch();
  
  // Excessive re-renders - selector creates new reference
  const cartItems = useSelector(state => state.cart.items);
  
  // Excessive re-renders - complex calculation on every render
  const cartTotal = useSelector(state => {
    return state.cart.items.reduce((total, item) => {
      return total + (item.price * item.quantity);
    }, 0);
  });

  console.log('[DEBUG] Cart component rendered');

  // No loading state
  // No disabled state
  // Missing accessibility roles

  const handleClearCart = () => {
    // No confirmation dialog
    // No disabled state during operation
    dispatch(clearCart());
  };

  return (
    <div className="cart-container">
      <h2>Shopping Cart</h2>
      
      {cartItems.length === 0 ? (
        <p className="empty-cart">Your cart is empty</p>
      ) : (
        <>
          <div className="cart-items">
            {cartItems.map(item => (
              <CartItem
                key={item.id}
                item={item}
                onRemove={() => dispatch(removeFromCart(item.id))}
                onUpdateQuantity={(quantity) => dispatch(updateQuantity(item.id, quantity))}
              />
            ))}
          </div>
          
          <div className="cart-summary">
            <div className="cart-total">
              <span>Total: ${cartTotal.toFixed(2)}</span>
            </div>
            
            <button
              onClick={handleClearCart}
              className="clear-cart-button"
              // No disabled state
              // Missing accessibility role
            >
              Clear Cart
            </button>
            
            <button
              className="checkout-button"
              // No disabled state
              // Missing accessibility role
            >
              Checkout
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;

