const mongoose = require('mongoose')

const fertilizerSchema = new mongoose.Schema({
     type:String,
     priceperkg:String,
     quantitykg:String,
     arrivalDate:String,
     societyId :{
         type:mongoose.Schema.Types.ObjectId, ref:"Society"
     }
});

module.exports = mongoose.model('fertilizer_mst',fertilizerSchema)