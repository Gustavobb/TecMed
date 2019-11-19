
const express = require("express")
const routes = express.Router()
var cors = require('cors')
routes.use(cors())

const ContentController = require('./app/controllers/ContentController');
const VideoController = require('./app/controllers/VideoController');
const AwsController = require('./app/controllers/AwsController');
const LoginController = require('./app/controllers/LoginController');

routes.get('/getPreSignedUrl', AwsController.getPreSignedUrl);
routes.get('/listObjects', AwsController.listObjects);
routes.post('/awsVideoPost/:id', AwsController.statusOnPost);

routes.get('/getContents', ContentController.getContents);
routes.get('/getContentById/', ContentController.getContentById);
routes.get('/getUnreviewedVideos', ContentController.getUnreviewedVideos)
routes.get('/updateVideoQuiz/:id', ContentController.updateVideoQuiz)

routes.post('/register', LoginController.register); // register q funciona para doctor ou user

// routes.post('/updateScore/', LoginController.updateScore)
routes.post('/registerUser', LoginController.registerUser);
routes.post('/registerDoctor', LoginController.registerDoctor);
routes.post('/login',LoginController.login);
routes.post('/forgot', LoginController.forgot);
routes.get(/\/reset\/.+/, LoginController.reset);

routes.get('/videoedit', VideoController.edit)

module.exports = routes;