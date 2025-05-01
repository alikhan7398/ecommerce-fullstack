import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { login } from '../redux/userSlice';
import { toast } from 'react-toastify'; // Import toast

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const trimmedUsername = username.trim();
    const trimmedPassword = password.trim();
    console.log('Login attempt:', { username: trimmedUsername, password: trimmedPassword });
    const url = 'http://localhost:5000/api/login';
    console.log('Sending to:', url);
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: trimmedUsername, password: trimmedPassword }),
      });
      console.log('Received status:', response.status, response.statusText);
      const data = await response.json();
      console.log('Login data:', data);
      if (response.status === 200) {
        setMessage('Login successful');
        toast.success('Login successful!', {
          position: 'top-center',
          autoClose: 1000,
          hideProgressBar: true,
          pauseOnHover: false,
          draggable: true,
          theme: 'colored',
        }); // Match your addProduct style
        dispatch(login({ username: data.username || trimmedUsername, token: data.token }));
        navigate('/');
      } else {
        setMessage(data.message || 'Invalid username or password');
      }
    } catch (error) {
      console.error('Login error:', error);
      setMessage('Error: ' + error.message);
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center min-vh-100 py-4">
      <div className="card shadow p-4" style={{ maxWidth: '400px', width: '100%' }}>
        <h3 className="text-center mb-4">Welcome Back</h3>
        <form onSubmit={handleSubmit}>
          <div className="form-floating mb-3">
            <input
              type="text"
              className="form-control"
              id="username"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            <label htmlFor="username">Username</label>
          </div>
          <div className="form-floating mb-4">
            <input
              type="password"
              className="form-control"
              id="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <label htmlFor="password">Password</label>
          </div>
          <button type="submit" className="btn btn-dark w-100 mb-3">
            Login
          </button>
          <p className="text-center">
            Don't have an account?{' '}
            <NavLink to="/register" className="text-decoration-none">
              Register
            </NavLink>
          </p>
        </form>
        {message && (
          <p className={`text-center ${message.includes('successful') ? 'text-success' : 'text-danger'}`}>
            {message}
          </p>
        )}
      </div>
    </div>
  );
}

export default Login;