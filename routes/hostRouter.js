const express = require('express');
const path = require('path');
const { rootDir } = require('../utils/path');

const hostController = require('../controllers/hostController')

const hostRouter = express.Router();

hostRouter.get('/add-home',hostController.getAddHome)
hostRouter.post('/add-home', hostController.postAddHome);
hostRouter.get('/host-homes',hostController.getHostHomesList)
hostRouter.get('/edit-home/:homeId',hostController.getEditHome)
hostRouter.post('/edit-home',hostController.putEditHome)
hostRouter.post('/delete-home/:homeId',hostController.postDeleteHome)

exports.hostRouter = hostRouter;

