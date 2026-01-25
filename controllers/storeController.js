const Favourite = require('../models/favourite');
const Home = require('../models/home')
const {ObjectId} = require('mongodb')


exports.getHome = async (req, res) => {
    const registeredHomes = await Home.find()
    res.render('./store/home', { registeredHomes, currentPage: "Home" });

    // res.sendFile(path.join(rootDir,'views','home.html')

}

exports.getFavouritesHomes = async (req, res) => {
    let favourites = await Favourite.find().populate('homeId')
    favourites = favourites.map(fav => fav.homeId)

    res.render('./store/favourite-list', { favourites: favourites, currentPage: "favourites" });

    // res.sendFile(path.join(rootDir,'views','home.html')

}

exports.postToggleFavourite = async (req, res) => {
    const homeId = req.body.homeId.toString();
    //favourite home obj
    let favourite = await Favourite.findOne({ homeId }).populate('homeId')

    const home = await Home.findById({_id:homeId})

    if (!favourite) {
        home.favourite = true;
        const favourite = new Favourite({ homeId })
        await favourite.save()
    }else{
        home.favourite = false;
        await Favourite.findOneAndDelete({homeId})
    }
    await home.save()

    res.redirect('/favourites')
}

// exports.postRemoveFromFavourite = async (req, res) => {
//     const { homeId } = req.body;
//     console.log(homeId)
//     await Favourite.findOneAndDelete({ homeId })
//     console.log('House Remove, ID ', homeId)
//     res.redirect('/favourites')
// }


exports.getBookingsHomes = async (req, res) => {
    const bookings = []
    res.render('./store/bookings', { bookings, currentPage: "bookings" });

    // res.sendFile(path.join(rootDir,'views','home.html')

}


exports.getHomeDetails = async (req, res) => {
    const userId = req.params.userId;

    const home = await Home.findById(userId);

    if (!home) {
        res.redirect('/')
    } else {
        res.render('./store/home-details', { house: home, currentPage: "Home" })
    }

}







