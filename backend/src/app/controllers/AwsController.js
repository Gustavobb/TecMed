var AWS = require("aws-sdk");
const path = require('path');
const uuidv4 = require('uuid/v4');
require('dotenv').config({ path: path.resolve(__dirname, '..', '.env') });
const videoModel = require('../models/VideoModel');

AWS.config = new AWS.Config({
  region: process.env.AWS_REGION,
  accessKeyId: process.env.AWS_ACESSKEY,
  secretAccessKey: process.env.AWS_SECRETACCESSKEY,
});

s3 = new AWS.S3({ apiVersion: '2006-03-01' });

class AwsController {

  // PreSigned url parsing

  async getPreSignedUrl(req, res) {

    const filename = uuidv4();

    var params = {
      Bucket: 'tecmed',
      Key: 'videos/' + filename
    };

    try {

      const url = await s3.getSignedUrlPromise('putObject', params).then((url) => {
        return url
      })

      const newVideoModel = {
        awsS3: {
          status: false,
          filename: filename,
          key: 'videos/' + filename
        },

        videoSpecifications: {
          reviwed: false,
          title: "",
          description: "",
          category: "",
          creator: "",
          reviewer: ""
        },

        quiz: [{
          difficulty: "",
          question: "Sting",
          alternatives: [""],
        }]
      }

      let model = new videoModel(newVideoModel);

      await model.save()
        .then(mod => {
          return res.json({ "url": url, "id": mod._id });
        })

    } catch (e) {

      console.error(e)
      return res.status(400).json(e)
    }
  }

  async statusOnPost(req, res) {
    var id = req.query.id

    model.findById(id, (err, data) => {

      await model.update({ "awsS3.status": true });
      await model.save();
    })
  }

  // lista todos os objetos dentro de um certo bucket

  async listObjects(req, res) {
    var bucketParams = {
      Bucket: 'tecmed',
    };

    try {
      const data = await s3.listObjects(bucketParams).promise().then((data) => {
        return data.Contents;
      })

      return res.json({ "objects": data });
    }
    catch (e) {
      return res.status(400).json(e)
    }
  }
}

module.exports = new AwsController();