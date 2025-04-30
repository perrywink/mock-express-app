const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Get hostname for response
const os = require('os');
const hostname = os.hostname();

// Basic info endpoint
app.get('/', (req, res) => {
  res.json({
    message: 'API is running',
    environment: process.env.NODE_ENV || 'development',
    timestamp: new Date().toISOString(),
    host: hostname,
    podIp: process.env.POD_IP || 'unknown'
  });
});

// Users endpoints - these will be detected by Metlo
app.get('/api/users', (req, res) => {
  res.json([
    { id: 1, name: 'User 1', email: 'user1@example.com' },
    { id: 2, name: 'User 2', email: 'user2@example.com' }
  ]);
});

app.get('/api/users/:id', (req, res) => {
  res.json({ 
    id: req.params.id, 
    name: `User ${req.params.id}`, 
    email: `user${req.params.id}@example.com`,
    host: hostname 
  });
});

app.post('/api/users', (req, res) => {
  const newUser = req.body;
  res.status(201).json({ 
    ...newUser, 
    id: Math.floor(Math.random() * 1000),
    host: hostname
  });
});

app.put('/api/users/:id', (req, res) => {
  const updatedUser = req.body;
  res.json({ 
    ...updatedUser, 
    id: req.params.id,
    host: hostname
  });
});

app.delete('/api/users/:id', (req, res) => {
  res.json({ 
    success: true, 
    message: `User ${req.params.id} deleted`,
    host: hostname
  });
});

// Server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
