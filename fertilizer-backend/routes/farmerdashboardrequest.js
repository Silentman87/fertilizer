const express = require('express');
const router = express.Router();
const Farmer = require('../models/Farmer');
const Fertilizer = require('../models/Fertilizer');
const FarmerRequest = require('../models/FarmerRequest');

// Get available fertilizers for a farmer's society
router.get('/fertilizers/:farmerId', async (req, res) => {
  try {
    const farmer = await Farmer.findById(req.params.farmerId);
    if (!farmer) return res.status(404).json({ message: 'Farmer not found' });

    const fertilizers = await Fertilizer.find({ societyId: farmer.societyId });
    res.json(fertilizers);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


router.post('/request', async (req, res) => {
  try {
    const { farmerId, fertilizerId, quantity } = req.body;

    const newRequest = new FarmerRequest({
      farmerId,
      fertilizerId,
      quantity
    });

    const saved = await newRequest.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/requests/:farmerId', async (req, res) => {
  try {
    const requests = await FarmerRequest.find({ farmerId: req.params.farmerId })
      .populate('fertilizerId', 'type pricePerKg')
      .sort({ date: -1 }); // Latest first
    res.json(requests);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;  