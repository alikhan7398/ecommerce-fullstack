import React from 'react';
import { NavLink } from 'react-router-dom';

export default function OrderConfirmation() {
  console.log('OrderConfirmation component: Mounting'); // Debug log
  return (
    <div className="container d-flex justify-content-center align-items-center min-vh-100 py-4">
      <div className="card shadow p-4" style={{ maxWidth: '600px', width: '100%' }}>
        <h3 className="text-center mb-4">Order Confirmed</h3>
        <p className="text-center text-success">
          Your order has been placed successfully!
        </p>
        <p className="text-center">
          Thank you for shopping with us. You’ll receive a confirmation email soon.
        </p>
        <NavLink to="/" className="btn btn-dark w-100">
          Back to Home
        </NavLink>
      </div>
    </div>
  );
}