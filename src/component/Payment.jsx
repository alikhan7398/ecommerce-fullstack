import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { clearCart } from '../redux/handleCart';

export default function Payment() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.handleCart) || [];
  const total = cartItems.length
    ? cartItems
        .reduce((sum, item) => sum + (item.price || 0) * (item.qty || 1), 0)
        .toFixed(2)
    : '0.00';

  const [formData, setFormData] = useState({
    name: '',
    address: '',
    cardNumber: '',
    expiry: '',
    cvv: '',
  });
  const [message, setMessage] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    if (!token) {
      setMessage('Please log in first');
      return;
    }
    if (!cartItems.length) {
      setMessage('Cart is empty');
      return;
    }
    if (!formData.name || !formData.address || !formData.cardNumber || !formData.expiry || !formData.cvv) {
      setMessage('All fields are required');
      return;
    }
    try {
      const response = await fetch('http://localhost:5000/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ cartItems, total, paymentDetails: formData }),
      });
      const data = await response.json();
      if (response.status === 200) {
        setMessage('Payment successful');
        dispatch(clearCart());
        navigate('/order-confirmation');
      } else {
        setMessage(data.message || 'Payment failed');
      }
    } catch (error) {
      console.error('Payment error:', error);
      setMessage('Error during payment: ' + error.message);
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center min-vh-100 py-4">
      <div className="card shadow p-4" style={{ maxWidth: '600px', width: '100%' }}>
        <h3 className="text-center mb-4">Payment Details</h3>
        <div className="mb-3">
          <h5>Order Summary</h5>
          {cartItems.length === 0 ? (
            <p>No items in cart</p>
          ) : (
            <>
              <ul className="list-group mb-3">
                {cartItems.map((item) => (
                  <li key={item.id || Math.random()} className="list-group-item">
                    {item.title || 'Unknown Item'} x {item.qty || 1} = $
                    {((item.price || 0) * (item.qty || 1)).toFixed(2)}
                  </li>
                ))}
              </ul>
              <p className="fw-bold">Total: ${total}</p>
            </>
          )}
        </div>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">Full Name</label>
            <input
              type="text"
              className="form-control"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="address" className="form-label">Address</label>
            <textarea
              className="form-control"
              id="address"
              name="address"
              value={formData.address}
              onChange={handleInputChange}
              required
            ></textarea>
          </div>
          <div className="mb-3">
            <label htmlFor="cardNumber" className="form-label">Card Number</label>
            <input
              type="text"
              className="form-control"
              id="cardNumber"
              name="cardNumber"
              value={formData.cardNumber}
              onChange={handleInputChange}
              maxLength="16"
              required
            />
          </div>
          <div className="row mb-3">
            <div className="col">
              <label htmlFor="expiry" className="form-label">Expiry (MM/YY)</label>
              <input
                type="text"
                className="form-control"
                id="expiry"
                name="expiry"
                value={formData.expiry}
                onChange={handleInputChange}
                maxLength="5"
                required
              />
            </div>
            <div className="col">
              <label htmlFor="cvv" className="form-label">CVV</label>
              <input
                type="text"
                className="form-control"
                id="cvv"
                name="cvv"
                value={formData.cvv}
                onChange={handleInputChange}
                maxLength="3"
                required
              />
            </div>
          </div>
          <button type="submit" className="btn btn-dark w-100 mb-3">Submit Payment</button>
        </form>
        {message && (
          <p className={`text-center ${message.includes('successful') ? 'text-success' : 'text-danger'}`}>
            {message}
          </p>
        )}
        <p className="text-center">
          Need to log in? <NavLink to="/login">Login here</NavLink>
        </p>
      </div>
    </div>
  );
}