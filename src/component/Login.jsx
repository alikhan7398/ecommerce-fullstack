import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

export default function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });
  const [message, setMessage] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (response.status === 200) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        toast.success('Login successful');
        navigate('/');
      } else {
        setMessage(data.message || 'Login failed');
        toast.error(data.message || 'Login failed');
      }
    } catch (error) {
      console.error('Login error:', error);
      setMessage('Error during login');
      toast.error('Error during login');
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center min-vh-100 py-4">
      <div className="card shadow p-4" style={{ maxWidth: '400px', width: '100%' }}>
        <h3 className="text-center mb-4">Login</h3>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="username" className="form-label">Username</label>
            <input
              type="text"
              className="form-control"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <input
              type="password"
              className="form-control"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              required
            />
          </div>
          <button type="submit" className="btn btn-dark w-100 mb-3">Login</button>
        </form>
        {message && <p className="text-danger text-center">{message}</p>}
        <p className="text-center">
          Don't have an account? <NavLink to="/register">Register here</NavLink>
        </p>
      </div>
    </div>
  );
}