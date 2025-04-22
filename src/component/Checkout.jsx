import React, { useState, Component } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

class ErrorBoundary extends Component {
  state = { hasError: false, error: null };

  static getDerivedStateFromError(error) {
    console.error('ErrorBoundary caught error:', error); // Log error for debugging
    return { hasError: true, error };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="text-center">
          <p className="text-danger">Error: {this.state.error?.message || 'An unknown error occurred'}</p>
        </div>
      );
    }
    return this.props.children;
  }
}

export default function Checkout() {
  console.log('Checkout component: Mounting');
  const [message, setMessage] = useState('');
  const cartItems = useSelector((state) => {
    console.log('Redux state:', state); // Log entire Redux state
    return state.handleCart || [];
  });
  const navigate = useNavigate();

  console.log('Checkout state:', { cartItems, message });

  const handleCheckout = () => {
    console.log('handleCheckout: Called');
    const token = localStorage.getItem('token');
    if (!token) {
      setMessage('Please log in first');
      console.log('handleCheckout: No token');
      return;
    }
    if (!cartItems.length) {
      setMessage('Cart is empty');
      console.log('handleCheckout: Empty cart');
      return;
    }
    console.log('handleCheckout: Navigating to /payment');
    navigate('/payment');
  };

  return (
    <ErrorBoundary>
      <div className="container py-4">
        <h3 className="text-center mb-4">Checkout</h3>
        <p className="text-center">Testing checkout page rendering.</p>
        <button className="btn btn-dark w-100" onClick={handleCheckout}>
          Proceed to Payment
        </button>
        {message && <p className="text-danger text-center mt-3">{message}</p>}
        {/* Debugging: Display cart items */}
        <div className="mt-4">
          <h5>Debug: Cart Items</h5>
          {cartItems.length === 0 ? (
            <p>No items in cart</p>
          ) : (
            <ul>
              {cartItems.map((item) => (
                <li key={item.id || Math.random()}>
                  {item.title || 'Unknown Item'} x {item.qty || 1}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </ErrorBoundary>
  );
}