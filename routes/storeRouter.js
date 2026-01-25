const express= require('express')

const storeController = require('../controllers/storeController')

const storeRouter = express.Router();


storeRouter.get('/', storeController.getHome)
storeRouter.get('/favourites',storeController.getFavouritesHomes)
storeRouter.get('/bookings',storeController.getBookingsHomes)
storeRouter.get('/home-details/:userId', storeController.getHomeDetails)
storeRouter.post('/toggle-favourite',storeController.postToggleFavourite)

// storeRouter.post('/favourites',storeController.postAddtoFavourite)
// storeRouter.post('/remove-favourite',storeController.postRemoveFromFavourite)


module.exports=storeRouter;