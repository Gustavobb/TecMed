
const express = require("express")
const routes = express.Router()
var cors = require('cors')
routes.use(cors())

const VideoController = require('./app/controllers/VideoController');
const AwsController = require('./app/controllers/AwsController');
const LoginController = require('./app/controllers/LoginController');

// routes.get('/deleteBucket', AwsController.deleteBucket);
// routes.post('/listBuckets', AwsController.listBuckets);
// routes.put('/listObjects', AwsController.listObjects);
// routes.delete('/createBucket', AwsController.createBucket);
// routes.delete('/addObjectToBucket', AwsController.addObjectToBucket);
// routes.delete('/deleteObjectInBucket', AwsController.deleteObjectInBucket);
routes.get('/videos', VideoController.getVideos);
routes.post('/register', LoginController.register);
routes.post('/login',LoginController.login);
routes.post('/add', VideoController.addVideo);
routes.get('/id', VideoController.getVideoById);

module.exports = routes;