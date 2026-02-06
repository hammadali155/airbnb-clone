const mongoose = require('mongoose')



const homeSchema = new mongoose.Schema({
  houseName: {type:String, required:true},
  price:{type:Number, required:true},
  location:{type:String, required:true},
  rating:{type:String, required:true},
  photo:{type:String, required:true},
  description: String,
  host:{
    type:mongoose.Types.ObjectId,
    ref:'User',
    required:true
  }
})




module.exports = mongoose.model('Home',homeSchema);
