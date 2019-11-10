
const express = require("express")
const routes = express.Router()
var cors = require('cors')
routes.use(cors())

const VideoController = require('./app/controllers/VideoController');
const AwsController = require('./app/controllers/AwsController');
const LoginController = require('./app/controllers/LoginController');

routes.get('/getPreSignedUrl', AwsController.getPreSignedUrl);
routes.get('/listObjects', AwsController.listObjects);

routes.get('/getVideos', VideoController.getVideos);
routes.post('/add', VideoController.addVideo);
routes.get('/id', VideoController.getVideoById);

routes.post('/register', LoginController.register);
routes.post('/login', LoginController.login);

module.exports = routes;