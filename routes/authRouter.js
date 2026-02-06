const express = require('express')
const authController = require('../controllers/authController')

const authRouter = express.Router();


authRouter.get('/login', authController.getLogin)
authRouter.get('/signup', authController.getSignUp)
authRouter.post('/signup',authController.postSignUp)
authRouter.post('/login', authController.postLogin)
authRouter.get('/logout', authController.getLogOut)

module.exports = authRouter