const mongoose = require('mongoose');

const farmerSchema = new mongoose.Schema({
      name:String,
      phone:String,
      village:String,
      societyId:{
        type:mongoose.Schema.Types.ObjectId ,ref:"Society"
      }
});


module.exports = mongoose.model('farmer_mst',farmerSchema);