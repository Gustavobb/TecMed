var AWS = require("aws-sdk");
const path = require('path');
const uuidv4 = require('uuid/v4');
require('dotenv').config({ path: path.resolve(__dirname, '..', '.env') });
const VideoModel = require('../models/VideoModel ');

AWS.config = new AWS.Config({
  region: process.env.AWS_REGION,
  accessKeyId: process.env.AWS_ACESSKEY,
  secretAccessKey: process.env.AWS_SECRETACCESSKEY,
});

s3 = new AWS.S3({ apiVersion: '2006-03-01' });

class AwsController {

  // PreSigned url parsing

  async getPreSignedUrl(req, res) {
    var params = {
      Bucket: 'tecmed',
      Key: '/videos/' + uuidv4()
    };

    await s3.getSignedUrl('putObject', params).promise();
  }

  // lista todos os objetos dentro de um certo bucket

  async listObjects(req, res) {
    var bucketParams = {
      Bucket: 'tecmed',
    };

    const data;

    try {
      data = await s3.listObjects(bucketParams).promise().then((data) => {
        return data.Contents;
      })
    }
    catch (e) {
      return res.staTUS(400).json({ e })
    }

    return res.json(data);
  }
}

module.exports = new AwsController();