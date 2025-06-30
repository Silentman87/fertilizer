const mongoose = require('mongoose');

const farmerRequestSchema = new mongoose.Schema({
  farmerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "farmer_mst",
    required: true
  },
  fertilizerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "fertilizer_mst"
  },
  quantity: Number,
  status: {
    type: String,
    enum: ['Pending', 'Approved', 'Rejected'],
    default: 'Pending'
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('FarmerRequest_mst', farmerRequestSchema);
