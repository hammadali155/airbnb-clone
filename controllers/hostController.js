const Home= require('../models/home')
const {ObjectId} = require('mongodb')

exports.getAddHome = (req,res)=>{
    res.render('./host/add-home',{currentPage:'add home'})
}

exports.postAddHome = async (req, res) => {
    const {houseName,price,location,rating,photoUrl,description} = req.body;

    const home = new Home({houseName,price,location,rating,photoUrl,description,favourite:false})

    await home.save()

    res.redirect('/')
}



exports.getHostHomesList = async (req, res) => {
    const registeredHomes = await Home.find()
    res.render('./host/host-home-list', { registeredHomes, currentPage: "host homes" });

    // res.sendFile(path.join(rootDir,'views','home.html')

}

exports.getEditHome = async (req,res)=>{
    const home = await Home.findById(req.params.homeId)
    res.render('./host/edit-home',{home:home,currentPage:"edit home"})
}

exports.putEditHome = async (req,res)=>{
    const {id,houseName,price,location,rating,photoUrl,description} = req.body
    const home = Home.findOne({_id:id})

    await Home.findByIdAndUpdate(id, { 
            houseName, 
            price, 
            location, 
            rating, 
            photoUrl, 
            description,
            favourite:home.favourite
        });
    

    res.redirect('/host-homes')
    
}

exports.postDeleteHome = async (req,res)=>{
    const homeId = req.params.homeId;
    await Home.findByIdAndDelete(homeId);
    res.redirect('/host-homes')
}