import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from 'react-redux';
import { ThemeContext } from './ThemeContext';

export default function Navbar() {
  const state = useSelector((state) => state.handleCart || []);
  const user = useSelector((state) => state.user || {}); // Fallback to empty object
  const { username } = user; // Safe destructuring
  const { theme } = useContext(ThemeContext);

  console.log('Navbar rendering with username:', username, 'and theme:', theme);

  return (
    <div>
      <nav className={`navbar navbar-expand-lg ${theme === 'dark' ? 'bg-dark' : 'bg-white'} shadow-sm py-3`}>
        <div className="container">
          <NavLink className="navbar-brand fw-bold fs-4 text-secondary" to="/">
            {username && (
              <i className="fa fa-user-circle me-2" title={username}></i>
            )}
            Shopseeker
          </NavLink>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div
            className="collapse navbar-collapse justify-content-center"
            id="navbarSupportedContent"
          >
            <ul className="navbar-nav mx-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <NavLink className="nav-link active" aria-current="page" to="/">
                  Home
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/products">
                  Products
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/about">
                  About
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/settings">
                  Settings
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/contact">
                  Contact
                </NavLink>
              </li>
            </ul>
            <div className="buttons">
              {username && (
                <span className="me-2">
                  <i className="fa fa-user-circle"></i> {username}
                </span>
              )}
              {!username && (
                <>
                  <NavLink to="/register" className="btn btn-outline-dark">
                    <i className="fa fa-user-plus me-1"></i> Register
                  </NavLink>
                  <NavLink to="/login" className="btn btn-outline-dark ms-2">
                    <i className="fa fa-sign-in-alt me-1"></i> Login
                  </NavLink>
                </>
              )}
              <NavLink to="/cart" className="btn btn-outline-dark ms-2">
                <i className="fa fa-shopping-cart me-1"></i> Cart ({state.length})
              </NavLink>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}