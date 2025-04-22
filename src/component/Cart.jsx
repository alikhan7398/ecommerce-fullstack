import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { addCart, delCart, removeCart } from '../redux/handleCart';

export default function Cart() {
  const cart = useSelector((state) => {
    console.log('Cart.jsx: Redux state:', state); // Debug log
    return state.handleCart || [];
  });
  const dispatch = useDispatch();

  console.log('Cart rendered, cartItems:', cart);

  const increaseQty = (product) => {
    dispatch(addCart(product));
  };

  const decreaseQty = (product) => {
    dispatch(delCart(product));
  };

  const removeItem = (product) => {
    dispatch(removeCart(product));
  };

  const total = cart.length
    ? cart
        .reduce((sum, product) => sum + (product.price || 0) * (product.qty || 1), 0)
        .toFixed(2)
    : '0.00';

  return (
    <div className="container my-5">
      {cart.length === 0 ? (
        <h2 className="d-flex justify-content-center">Your cart is empty 😞</h2>
      ) : (
        <>
          {cart.map((product) => (
            <div className="row my-4" key={product.id || Math.random()}>
              <div className="col-md-3">
                <img
                  src={product.image || 'placeholder.jpg'}
                  alt={product.title || 'Unknown Item'}
                  height="100"
                />
              </div>
              <div className="col-md-6">
                <h5>{product.title || 'Unknown Item'}</h5>
                <p className="lead fw-bold">
                  ${(product.price || 0).toFixed(2)} x {product.qty || 1} = $
                  {((product.price || 0) * (product.qty || 1)).toFixed(2)}
                </p>
              </div>
              <div className="col-md-3">
                <button
                  className="btn btn-outline-dark me-2"
                  onClick={() => decreaseQty(product)}
                >
                  -
                </button>
                <button
                  className="btn btn-outline-dark me-2"
                  onClick={() => increaseQty(product)}
                >
                  +
                </button>
                <button
                  className="btn btn-danger"
                  onClick={() => removeItem(product)}
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
          <div className="row mt-4">
            <div className="col-md-12">
              <h4 className="fw-bold">Total: ${total}</h4>
              <NavLink to="/checkout" className="btn btn-dark mt-3">
                Proceed to Checkout
              </NavLink>
            </div>
          </div>
        </>
      )}
    </div>
  );
}