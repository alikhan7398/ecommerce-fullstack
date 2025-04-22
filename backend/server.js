console.log('Starting server.js...');
const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const app = express();
const port = 5000;
const secretKey = 'your-secret-key';

app.use(cors({ origin: 'http://localhost:3000' }));
app.use(express.json());

let users = [];
let orders = [];

app.post('/register', async (req, res) => {
  try {
    const { username, email, password } = req.body;
    console.log('Register attempt:', { username, email });
    if (!username || !email || !password) {
      return res.status(400).json({ message: 'All fields are required' });
    }
    if (users.find((user) => user.email === email)) {
      return res.status(400).json({ message: 'Email already exists' });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = { username, email, password: hashedPassword };
    users.push(user);
    console.log('User registered:', user);
    console.log('Current users:', users);
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error('Register error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

app.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    console.log('Login attempt:', { username });
    console.log('Current users:', users);
    const user = users.find((user) => user.username === username || user.email === username);
    if (!user) {
      console.log('User not found:', username);
      return res.status(400).json({ message: 'Invalid username or password' });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    console.log('Password match result:', isMatch);
    if (!isMatch) {
      console.log('Password mismatch for:', username);
      return res.status(400).json({ message: 'Invalid username or password' });
    }
    const token = jwt.sign({ username: user.username, email: user.email }, secretKey, { expiresIn: '1h' });
    console.log('Login successful:', { username, token });
    res.json({ message: 'Login successful', token, user: { username: user.username, email: user.email } });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

app.post('/checkout', (req, res) => {
  try {
    const token = req.headers['authorization']?.split(' ')[1];
    console.log('Checkout attempt, token:', token);
    if (!token) {
      console.log('No token provided');
      return res.status(401).json({ message: 'No token provided' });
    }
    const decoded = jwt.verify(token, secretKey);
    console.log('Token decoded:', decoded);
    const { cartItems, total } = req.body;
    if (!cartItems || !total) {
      console.log('Missing cartItems or total');
      return res.status(400).json({ message: 'Cart items and total are required' });
    }
    const order = {
      userEmail: decoded.email,
      cartItems,
      total,
      date: new Date(),
    };
    orders.push(order);
    console.log('Order placed:', order);
    res.json({ message: 'Order placed successfully', order });
  } catch (error) {
    console.error('Checkout error:', error);
    res.status(401).json({ message: 'Invalid token or server error' });
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});