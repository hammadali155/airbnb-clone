const { setRandomFallback } = require('bcryptjs');
const mongoose = require('mongoose')


const userSchema = new mongoose.Schema({
  firstName: {type:String, required:true},
  lastName:{type:String, required:true},
  email:{type:String, required:true,unique:true},
  password:{type:String, required:true},
  userType:{
    type:String,
    enum: ['guest','host'],
    default:'guest'
  },
  favourite:[{
    type:mongoose.Types.ObjectId,
    ref:'Home'
  }]
})


// homeSchema.pre('findOneAndDelete',async function(next){
//   const homeId = this.getQuery._id;
//   await Favourite.deleteOne({homeId})
// })

module.exports = mongoose.model('User',userSchema);
