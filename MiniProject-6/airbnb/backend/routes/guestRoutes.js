const express = require('express')
const guestRoutes = express.Router();
const {getHomeDetails, getHomes, postAddWishlist,postRemoveWishlist, getWishlist, getRules} = require('../controllers/guestController')
const {requireGuest, requireLogin} = require('../middlewares/authMiddleware')

guestRoutes.get('/homes',requireGuest, getHomes)

guestRoutes.get('/homes/:homeId',requireGuest, getHomeDetails);

guestRoutes.get('/wishlist',requireGuest, getWishlist)

guestRoutes.post('/wishlist/add',requireGuest, postAddWishlist)
guestRoutes.post('/wishlist/remove',requireGuest, postRemoveWishlist)
guestRoutes.get('/rules/:homeId', getRules);

module.exports = {guestRoutes};