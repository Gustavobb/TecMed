
const express = require("express")
const routes = express.Router()
var cors = require('cors')
routes.use(cors())

const VideoController = require('./app/controllers/ContentController');
const AwsController = require('./app/controllers/AwsController');
const LoginController = require('./app/controllers/LoginController');

routes.get('/getPreSignedUrl', AwsController.getPreSignedUrl);
routes.get('/listObjects', AwsController.listObjects);
routes.post('/awsVideoPost/:id', AwsController.statusOnPost);

routes.get('/getContents', VideoController.getContents);
routes.get('/getContentById/:id', VideoController.getContentById);
routes.get('/getUnreviewedVideos', VideoController.getUnreviewedVideos)

routes.post('/register', LoginController.register);
routes.post('/login', LoginController.login);

module.exports = routes;