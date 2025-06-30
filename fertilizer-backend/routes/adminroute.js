const express = require('express');
const router = express.Router();
const Admin = require('../models/Admin');
const bcrypt = require('bcrypt');



router.post('/', async (req, res) => {
  const { UserName, Password } = req.body;

  if (!UserName || !Password) {
    return res.status(400).json({ error: 'Please provide username and password' });
  }

  try {
    const admin = await Admin.findOne({ UserName });
    if (!admin) {
      return res.status(401).json({ error: 'Invalid username or password' });
    }

    const isMatch = await bcrypt.compare(Password, admin.Password);
    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid username or password' });
    }

    // If login successful, you can generate token here (e.g. JWT), or just send a success response
    return res.status(200).json({ message: 'Login successful' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
