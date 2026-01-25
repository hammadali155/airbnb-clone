const mongoose = require('mongoose')
const Favourite = require('./favourite')


const homeSchema = new mongoose.Schema({
  houseName: {type:String, required:true},
  price:{type:Number, required:true},
  location:{type:String, required:true},
  rating:{type:String, required:true},
  photoUrl:{type:String, required:true},
  description: String,
  favourite: Boolean
})


homeSchema.pre('findOneAndDelete',async function(next){
  const homeId = this.getQuery._id;
  await Favourite.deleteOne({homeId})
})

module.exports = mongoose.model('Home',homeSchema);
