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
      const url = await new Promise((resolve, reject) => {
        s3.getSignedUrl('putObject', params, function (err, url) {

          if (err) {
            reject(err)
          }
          resolve(url)
        })
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

      model.save()
        .then(mod => {
          return res.json({ "url": url, "id": mod._id });
        })
      
        // axios.put(signedRequest, file, options)
        // .then(result => {
        //   console.log("Response from s3")
        //   this.setState({ success: true });
        // })

    } catch (e) {
      return res.status(400).json(e)
    }
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