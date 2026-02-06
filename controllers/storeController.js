const User = require('../models/user')
const Home = require('../models/home')
const { ObjectId } = require('mongodb')


exports.getHome = async (req, res) => {
    const registeredHomes = await Home.find()
    const user = req.session.user ? await User.findById(req.session.user._id) : null;
    const favouriteIds = user ? user.favourite.map(id => id.toString()) : [];

    const homesWithFavourites = registeredHomes.map(home => {
        return {
            ...home._doc,
            favourite: favouriteIds.includes(home._id.toString())
        }
    });

    res.render('./store/home', { registeredHomes: homesWithFavourites, currentPage: "Home" });
}

exports.getFavouritesHomes = async (req, res) => {
    const userId = req.session.user._id;
    let user = await User.findById(userId).populate('favourite')

    const favouriteHomes = user.favourite.map(home => {
        return {
            ...home._doc,
            favourite: true
        }
    });

    res.render('./store/favourite-list', { favourites: favouriteHomes, currentPage: "favourites" });
}

exports.postToggleFavourite = async (req, res) => {
    const homeId = req.body.homeId;
    const userId = req.session.user._id;

    try {
        const user = await User.findById(userId);
        const isFavourite = user.favourite.includes(homeId);

        if (isFavourite) {
            user.favourite.pull(homeId);
        } else {
            user.favourite.push(homeId);
        }
        await user.save();
        res.redirect('/favourites');
    } catch (err) {
        console.log(err);
        res.redirect('/');
    }
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
    const homeId = req.params.userId;

    const home = await Home.findById(homeId);
    if (!home) {
        return res.redirect('/')
    }

    const user = req.session.user ? await User.findById(req.session.user._id) : null;
    const isFavourite = user ? user.favourite.includes(homeId) : false;

    const homeWithFavourite = {
        ...home._doc,
        favourite: isFavourite
    };

    res.render('./store/home-details', { house: homeWithFavourite, currentPage: "Home" })
}







