const express = require('express');
const mongoose = require('mongoose');
const ShoppingList = require('./models/ShoppingList');

const app = express();
const PORT = process.env.PORT || 3000;

mongoose.connect('mongodb+srv://yareedaharitha:<PASSWORD>@cluster1.4a49qwt.mongodb.net/?retryWrites=true&w=majority', {});

app.use(express.json());

// CRUD Endpoints

// Create a new shopping list
app.post('/shopping-lists', async (req, res) => {
  try {
    const shoppingList = await ShoppingList.create(req.body);
    res.json(shoppingList);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Read all shopping lists
app.get('/shopping-lists', async (req, res) => {
  try {
    const shoppingLists = await ShoppingList.find();
    res.json(shoppingLists);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Read a specific shopping list
app.get('/shopping-lists/:id', async (req, res) => {
  try {
    const shoppingList = await ShoppingList.findById(req.params.id);
    res.json(shoppingList);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update a shopping list
app.put('/shopping-lists/:id', async (req, res) => {
  try {
    const shoppingList = await ShoppingList.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(shoppingList);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete a shopping list
app.delete('/shopping-lists/:id', async (req, res) => {
  try {
    await ShoppingList.findByIdAndDelete(req.params.id);
    res.json({ message: 'Shopping list deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

