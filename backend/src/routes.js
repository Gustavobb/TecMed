
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

routes.get('/getContents', ContentController.getContents);
routes.get('/getContentById/:id', ContentController.getContentById);
routes.get('/getUnreviewedVideos', ContentController.getUnreviewedVideos)

routes.post('/registerUser', LoginController.registerUser);
routes.post('/registerDoctor', LoginController.registerDoctor);
routes.post('/login',LoginController.login);

routes.get('/videoedit', VideoController.edit)

module.exports = routes;