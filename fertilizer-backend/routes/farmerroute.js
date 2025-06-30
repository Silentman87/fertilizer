const express = require('express');
const router = express.Router();
const Farmer = require('../models/Farmer');
const FarmerRequest = require('../models/FarmerRequest');

router.post('/',async(req,res) => {
    try{
     const farmer = new Farmer(req.body);
     await farmer.save();
     res.status(201).json(farmer)
    } catch(err) {
       res.status(400).json({error: err.message});
    }
});



//send farmer list 
router.get('/', async(req, res) => {
     try{
        const farmers  = await Farmer.find().populate('SocietyId');
        res.json(farmers);
     }
     catch (err)
     {
        res.status(500).json({error : err.message});
     }
});


router.get('/:id', async(req,res)=>{
     try {
        const farmer = await Farmer.findById(req.params.id).populate('societyId');
        res.json(farmer)
     } catch (error) {
        res.status(500).json({error: error.message});
     }
});

// Update farmer
router.put('/:id', async (req, res) => {
  try {
    const farmer = await Farmer.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!farmer) return res.status(404).json({ message: 'Farmer not found' });
    res.json(farmer);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Delete farmer
router.delete('/:id', async (req, res) => {
  try {
    const result = await Farmer.findByIdAndDelete(req.params.id);
    if (!result) return res.status(404).json({ message: 'Farmer not found' });
    res.json({ message: 'Farmer deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST /request - Submit a request
router.post('/request', async (req, res) => {
  try {
    const newRequest = new FarmerRequest(req.body);
    await newRequest.save();
    res.status(201).json({ message: 'Request submitted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to submit request' });
  }
});

// GET /my-requests/:phone - Get requests by farmer's phone
router.get('/my-requests/:phone', async (req, res) => {
  try {
    const requests = await FarmerRequest.find({ phone: req.params.phone });
    res.status(200).json(requests);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch requests' });
  }
});


module.exports = router;