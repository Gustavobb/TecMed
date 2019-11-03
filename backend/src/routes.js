const { Router } = require('express');
const routes = new Router();

const AwsController = require('./app/controllers/AwsController');

routes.get('/deleteBucket', AwsController.deleteBucket);
routes.post('/listBuckets', AwsController.listBuckets);
routes.put('/listObjects', AwsController.listObjects);
routes.delete('/createBucket', AwsController.createBucket);
routes.delete('/addObjectToBucket', AwsController.addObjectToBucket);
routes.delete('/deleteObjectInBucket', AwsController.deleteObjectInBucket);

module.exports = routes;