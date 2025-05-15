const express = require("express");
const cors = require("cors");
const cyberchief_bolt = require("cyberchief-bolt").initExpress;

require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(
  cyberchief_bolt({
    key: "bolt.F7HsKds1i3ZOzjytxvN9iPHQw58e6P/HGcdNEEYz",
    host: "http://bolt-staging-719932934.us-east-2.elb.amazonaws.com:8081",
  })
);

app.use(cors());
app.use(express.json());

const os = require("os");
const hostname = os.hostname();

// Root metadata endpoint
app.get("/", (req, res) => {
  res.json({
    message: "Welcome to the API",
    status: "running",
    uptime: process.uptime(),
    environment: process.env.NODE_ENV || "development",
    timestamp: new Date().toISOString(),
    host: hostname,
    podIp: process.env.POD_IP || "unknown",
    availableRoutes: [
      "/api/users",
      "/api/products",
      "/api/orders",
      "/api/settings",
      "/api/admin/metrics",
      "/api/admin/logs",
      "/api/admin/clear-cache",
    ],
  });
});

// ========== Users ==========
app.get("/api/users", (req, res) => {
  res.json([{ id: 1, name: "Alice", email: "alice@example.com" }]);
});

app.get("/api/users/:id", (req, res) => {
  res.json({
    id: req.params.id,
    name: `User ${req.params.id}`,
    email: `user${req.params.id}@example.com`,
  });
});

app.post("/api/users", (req, res) => {
  const newUser = { id: Math.floor(Math.random() * 1000), ...req.body };
  res.status(201).json(newUser);
});

app.put("/api/users/:id", (req, res) => {
  res.json({ id: req.params.id, ...req.body });
});

app.delete("/api/users/:id", (req, res) => {
  res.json({ success: true, message: `User ${req.params.id} deleted` });
});

// ========== Products ==========
app.get("/api/products", (req, res) => {
  res.json([{ id: 1, name: "Sample Product", price: 19.99 }]);
});

app.get("/api/products/:id", (req, res) => {
  res.json({
    id: req.params.id,
    name: `Product ${req.params.id}`,
    price: 29.99,
  });
});

app.post("/api/products", (req, res) => {
  const newProduct = { id: Math.floor(Math.random() * 1000), ...req.body };
  res.status(201).json(newProduct);
});

app.put("/api/products/:id", (req, res) => {
  res.json({ id: req.params.id, ...req.body });
});

app.delete("/api/products/:id", (req, res) => {
  res.json({ deleted: true, id: req.params.id });
});

// ========== Orders ==========
app.get("/api/orders", (req, res) => {
  res.json([{ id: 1, userId: 1, productIds: [1, 2], total: 59.98 }]);
});

app.get("/api/orders/:id", (req, res) => {
  res.json({ id: req.params.id, userId: 1, productIds: [1], total: 19.99 });
});

app.post("/api/orders", (req, res) => {
  const newOrder = { id: Math.floor(Math.random() * 1000), ...req.body };
  res.status(201).json(newOrder);
});

app.put("/api/orders/:id", (req, res) => {
  res.json({ id: req.params.id, ...req.body, updated: true });
});

app.delete("/api/orders/:id", (req, res) => {
  res.json({ deleted: true, id: req.params.id });
});

// ========== Settings ==========
app.get("/api/settings", (req, res) => {
  res.json({ theme: "dark", notifications: true });
});

app.post("/api/settings", (req, res) => {
  res.status(201).json({ ...req.body });
});

// ========== Admin ==========
app.get("/api/admin/metrics", (req, res) => {
  res.json({ uptime: process.uptime(), memoryUsage: process.memoryUsage() });
});

app.get("/api/admin/logs", (req, res) => {
  res.json({ logs: ["Server started", "No errors reported"] });
});

app.post("/api/admin/clear-cache", (req, res) => {
  res.json({ status: "cleared", timestamp: new Date().toISOString() });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
