const Home= require('../models/home')
const {ObjectId} = require('mongodb')
const { findOneAndDelete } = require('../models/user')
const { deleteImage } = require('../utils/file')

exports.getAddHome = (req,res)=>{
    res.render('./host/add-home',{currentPage:'add home'})
}

exports.postAddHome = async (req, res) => {
    const {houseName,price,location,rating,description} = req.body;
    const photo = req.file ? req.file.filename : null;
    const home = new Home({houseName,price,location,rating,photo,description,host:req.session.user._id})

    await home.save()
    res.redirect('/')
}



exports.getHostHomesList = async (req, res) => {
    const hostId = req.session.user

    const hostHomes = await Home.find({host:hostId})
    res.render('./host/host-home-list', { registeredHomes:hostHomes, currentPage: "host homes" });

    // res.sendFile(path.join(rootDir,'views','home.html')

}

exports.getEditHome = async (req,res)=>{
    const home = await Home.findById(req.params.homeId)
    res.render('./host/edit-home',{home:home,currentPage:"edit home"})
}

exports.putEditHome = async (req,res)=>{
    const {id,houseName,price,location,rating,description} = req.body


    const home = await Home.findById(id)
    home.houseName = houseName
    home.price = price
    home.location = location
    home.rating = rating
    home.description = description
    if(req.file){
        const oldPhoto = home.photo;
        deleteImage(oldPhoto);
        home.photo = req.file.filename
    }

    await home.save()
    res.redirect('/host-homes')
    
}

exports.postDeleteHome = async (req,res)=>{
    const homeId = req.params.homeId;
    const hostId = req.session.user._id

    await Home.findOneAndDelete({_id:homeId,host:hostId})
    return res.redirect('/host-homes')
}