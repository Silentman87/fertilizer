const express = require('express');
const router = express.Router();
const FarmerRequest = require('../models/FarmerRequest');
const Farmer = require('../models/Farmer');
const Fertilizer = require('../models/Fertilizer');
// Create new request
router.post('/create', async (req, res) => {
  try {
    const { farmerId, fertilizerId, quantity } = req.body;

    // Optional: check if farmer exists
    const farmer = await Farmer.findById(farmerId);
    if (!farmer) return res.status(404).json({ message: 'Farmer not found' });

    const newRequest = new FarmerRequest({
      farmerId,
      fertilizerId,
      quantity
    });

    const savedRequest = await newRequest.save();
    res.status(201).json(savedRequest);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get all requests
router.get('/all', async (req, res) => {
  try {
    const requests = await FarmerRequest.find()
      .populate('farmerId', 'name phone village')
      .populate('fertilizerId', 'type pricePerKg');
    res.json(requests);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get single request by ID
router.get('/:id', async (req, res) => {
  try {
    const request = await FarmerRequest.findById(req.params.id)
      .populate('farmerId')
      .populate('fertilizerId');
    if (!request) return res.status(404).json({ message: 'Request not found' });
    res.json(request);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update request status
router.put('/:id', async (req, res) => {
  try {
    const { status } = req.body;
    if (!['Pending', 'Approved', 'Rejected'].includes(status)) {
      return res.status(400).json({ message: 'Invalid status value' });
    }

    const updated = await FarmerRequest.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    if (!updated) return res.status(404).json({ message: 'Request not found' });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete a request
router.delete('/:id', async (req, res) => {
  try {
    const deleted = await FarmerRequest.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Request not found' });
    res.json({ message: 'Request deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;

