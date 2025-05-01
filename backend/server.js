const express = require('express');
const cors = require('cors');
const app = express();

app.use(express.json());
app.use(cors({ origin: '*' })); // Allow all origins for testing

// Log all incoming requests
app.use((req, res, next) => {
  console.log(`Received ${req.method} request to ${req.url} at ${new Date().toISOString()}`);
  next();
});

// Test GET route
app.get('/test', (req, res) => {
  console.log('Test route hit');
  res.status(200).json({ message: 'Server is running' });
});

// Register POST route
app.post('/api/register', (req, res) => {
  console.log('Register route hit:', req.body);
  res.status(201).json({ message: 'User registered successfully' });
});

// Login POST route
app.post('/api/login', (req, res) => {
  console.log('Login route hit:', req.body);
  const { username } = req.body;
  res.status(200).json({
    message: 'Login successful',
    token: 'dummy-token',
    user: { username }
  });
});

// Checkout POST route
app.post('/api/checkout', (req, res) => {
  const token = req.headers.authorization;

  // Dummy token validation
  if (!token || token !== 'Bearer dummy-token') {
    console.log('Invalid or missing token:', token);
    return res.status(401).json({ message: 'Unauthorized: Invalid token' });
  }

  const orderData = req.body;
  console.log('Checkout route hit. Order data received:', orderData);

  // Simulate storing the order or processing payment
  res.status(200).json({ message: 'Checkout successful', order: orderData });
});

// Catch-all route (must come LAST)
app.use('*', (req, res) => {
  console.log('Catch-all route hit:', req.url);
  res.status(404).json({ message: 'Route not found' });
});

// Start server
const PORT = 5000;
app.listen(PORT, '0.0.0.0', (err) => {
  if (err) {
    console.error('Failed to start server:', err);
  } else {
    console.log(`Server running on port ${PORT}`);
    console.log('Listening on all interfaces');
  }
});

// Error logging
process.on('uncaughtException', (err) => {
  console.error('Uncaught Exception:', err);
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
});