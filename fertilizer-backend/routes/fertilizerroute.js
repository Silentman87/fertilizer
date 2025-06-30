const express = require('express');
const router = express.Router();
const Fertilizer = require('../models/Fertilizer');


//create for fertilizer 
router.post('/',async(req,res) =>{
    try {
    const fertilizer = new Fertilizer(req.body);
    await fertilizer.save();
    res.json('success');
    }
    catch (err) {
        res.json({error: err.message});
    }
});

// listinf all fertizer
router.get('/',async(req,res)=>{
    try{
    const allfertilizer = await Fertilizer.find();
    res.json(allfertilizer);
    }
    catch(err) {
        res.status(500).json({error: err.message});
    }
});

//  Get one fertiliser by ID
router.get('/:id', async (req, res) => {
  try {
    const fertiliser = await Fertilizer.findById(req.params.id);
    if (!fertiliser) return res.status(404).json({ message: 'Not found' });
    res.json(fertiliser);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update a fertiliser
router.put('/:id', async (req, res) => {
  try {
    const updated = await Fertiliser.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ message: 'Not found' });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

//  Delete a fertiliser
router.delete('/:id', async (req, res) => {
  try {
    const deleted = await Fertiliser.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Not found' });
    res.json({ message: 'Deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


module.exports   = router;