var AWS = require("aws-sdk");
AWS.config.update({ region: 'sa-east-1' });
s3 = new AWS.S3({ apiVersion: '2006-03-01' });

class AwsController {

  // lista todos os buckets crados

  async listBuckets(req, res) {
    s3.listBuckets(function (err, data) {
      if (err) {
        console.log("Error", err);
      } else {
        return res.json(data.Buckets);
      }
    });
  }

  // lista todos os objetos dentro de um certo bucket

  async listObjects(req, res) {
    var bucketParams = {
      Bucket: req.params.bucketName,
    };

    s3.listObjects(bucketParams, function (err, data) {
      if (err) {
        console.log("Error", err);
      } else {
        return res.json(data)
      }
    });
  }

  // cria um bucket

  async createBucket(req, res) {
    var bucketParams = {
      Bucket: req.params.bucketName,
      ACL: 'public-read'
    };

    s3.createBucket(bucketParams, function (err, data) {
      if (err) {
        console.log("Error", err);
      } else {
        console.log("Success", data.Location);
      }
    });
  }

  // deleta um bucket

  async deleteBucket(req, res) {
    var bucketParams = {
      Bucket: req.params.bucketName
    };

    s3.deleteBucket(bucketParams, function (err, data) {
      if (err) {
        console.log("Error", err);
      } else {
        console.log("Success", data);
      }
    });
  }

  // adiciona um objeto a um bucket

  async addObjectToBucket(req, res) {
    var file = req.params.file
    var fs = require('fs');

    fs.readFile(file, (err, data) => {
      if (err) throw err;
      var uploadParams =
      {
        Bucket: req.params.bucketName,
        Key: req.params.fileId,
        Body: JSON.stringify(data, null, 2)
      };

      s3.upload(uploadParams, function (err, data) {
        if (err) {
          console.log("Error", err);
        } if (data) {
          console.log("Upload Success", data.Location);
        }
      });
    });
  }

  // deleta um objeto de um bucket

  async deleteObjectInBucket(req, res) {
    var bucketParams = {
      Bucket: req.params.bucketName,
      Key: req.params.keyName
    };

    s3.deleteObject(bucketParams, function (err, data) {
      if (err) {
        console.log("Error", err);
      } else {
        console.log("Success", data);
      }
    });
  }
}

module.exports = new AwsController();