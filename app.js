const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const cyberchief_bolt = require("cyberchief-bolt").initExpress;
// const metlo = require("metlo").initExpress;

require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(
  cyberchief_bolt(
      {
          key: "bolt.2szz920IOcZp8lzXkYxKtB6TQZjkNJnPHKuJb2qf",
          host: "http://bolt-staging-719932934.us-east-2.elb.amazonaws.com:8081",
      })); 

// app.use(
//   metlo(
//     {
//       key: "metlo.53mcBbUTPTzklhFDJnIlkVoTC76pRYzrg8mX5E7w",
//       host: "https://app.metlo.com:8081",
//     }
//   )
// );

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const os = require('os');
const hostname = os.hostname();

app.get('/', (req, res) => {
  res.json({
    message: 'API is running',
    environment: process.env.NODE_ENV || 'development',
    timestamp: new Date().toISOString(),
    host: hostname,
    podIp: process.env.POD_IP || 'unknown'
  });
});

// User endpoints
app.get('/api/users', (req, res) => {
  res.json([{ id: 1, name: 'User 1', email: 'user1@example.com' }]);
});
app.get('/api/users/:id', (req, res) => {
  res.json({ id: req.params.id, name: `User ${req.params.id}` });
});
app.post('/api/users', (req, res) => {
  res.status(201).json({ ...req.body, id: Math.random() * 1000 });
});
app.put('/api/users/:id', (req, res) => {
  res.json({ ...req.body, id: req.params.id });
});
app.delete('/api/users/:id', (req, res) => {
  res.json({ success: true });
});

// Products
app.get('/api/products', (req, res) => res.json([]));
app.post('/api/products', (req, res) => res.status(201).json(req.body));
app.get('/api/products/:id', (req, res) => res.json({ id: req.params.id }));
app.put('/api/products/:id', (req, res) => res.json({ ...req.body }));
app.delete('/api/products/:id', (req, res) => res.json({ deleted: true }));

// Orders
app.get('/api/orders', (req, res) => res.json([]));
app.post('/api/orders', (req, res) => res.status(201).json(req.body));
app.get('/api/orders/:id', (req, res) => res.json({ id: req.params.id }));
app.put('/api/orders/:id', (req, res) => res.json({ updated: true }));
app.delete('/api/orders/:id', (req, res) => res.json({ deleted: true }));

// Settings
app.get('/api/settings', (req, res) => res.json({ theme: "dark" }));
app.post('/api/settings', (req, res) => res.status(201).json(req.body));

// Admin endpoints
app.get('/api/admin/metrics', (req, res) => res.json({ uptime: process.uptime() }));
app.get('/api/admin/logs', (req, res) => res.json({ logs: [] }));
app.post('/api/admin/clear-cache', (req, res) => res.json({ status: "cleared" }));

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
