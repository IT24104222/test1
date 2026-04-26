const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
const uri = process.env.MONGODB_URI;
mongoose.connect(uri)
  .then(() => console.log("✅ MongoDB database connection established successfully"))
  .catch((err) => console.error("❌ MongoDB connection error:", err.message));

// Import Model
const Item = require('./models/Item');

// --- ROUTES ---

// GET: Fetch all items
app.get('/items', async (req, res) => {
  try {
    const items = await Item.find();
    res.json(items);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST: Add a new item
app.post('/items/add', async (req, res) => {
  const newItem = new Item({
    name: req.body.name,
    description: req.body.description,
    category: req.body.category,
    quantity: req.body.quantity
  });

  try {
    const savedItem = await newItem.save();
    res.status(201).json(savedItem);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE: Remove an item
app.delete('/items/:id', async (req, res) => {
  try {
    await Item.findByIdAndDelete(req.params.id);
    res.json('Item deleted.');
  } catch (err) {
    res.status(400).json('Error: ' + err);
  }
});

app.listen(port, () => {
  console.log(`🚀 Server is running on port: ${port}`);
});