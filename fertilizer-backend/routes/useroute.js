const express = require('express');
const router = express.Router();


router.use('/farmer',require('./farmerroute'));
router.use('/fertilizer',require('./fertilizerroute'));
router.use('/society',require('./societyroute'));
router.use('/admin', require('./adminroute'));
router.use('/farmerrequest', require('./farmerrequestroute'));
router.use('/farmerdashboardreuest',require('./farmerdashboardrequest'));
module.exports = router;