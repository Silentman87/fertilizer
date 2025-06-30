const express = require('express');
const router = express.Router();
const Society = require('../models/Society');

// ➕ Create a society
router.post('/', async (req, res) => {
  try {
    const society = new Society(req.body);
    await society.save();
    res.status(201).json(society);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// 📄 Get all societies
router.get('/', async (req, res) => {
  try {
    const societies = await Society.find();
    res.json(societies);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 📄 Get one society by ID
router.get('/:id', async (req, res) => {
  try {
    const society = await Society.findById(req.params.id);
    if (!society) return res.status(404).json({ message: 'Society not found' });
    res.json(society);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✏️ Update society
router.put('/:id', async (req, res) => {
  try {
    const updated = await Society.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ message: 'Society not found' });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// ❌ Delete society
router.delete('/:id', async (req, res) => {
  try {
    const deleted = await Society.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Society not found' });
    res.json({ message: 'Deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;