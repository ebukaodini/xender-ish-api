// Import required AWS SDK clients and commands for Node.js.
// const { S3Client, PutObjectCommand, DeleteObjectCommand } = require("aws-sdk");
// const AWS = require("aws-sdk");
// const S3 = require('aws-sdk/clients/s3');
const path = require("path");
const fs = require("fs");
const AWS = require('aws-sdk');

// Upload file to specified bucket.
const uploadToS3 = async (filepath) => {
  try {

    AWS.config.update({
      accessKeyId: process.env.AWS_ACCESS_KEY,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
      region: process.env.AWS_S3_REGION
    });

    let s3Client = new AWS.S3();

    const file = filepath;
    const fileStream = fs.createReadStream(file);

    // Set the parameters
    const uploadParams = {
      Bucket: process.env.AWS_BUCKET_NAME,
      // Add the required 'Key' parameter using the 'path' module.
      Key: path.basename(file),
      // Add the required 'Body' parameter
      Body: fileStream
    };

    s3Client.upload(uploadParams)
      .promise()
      .then((data) => {
        console.log("Success", data);
        return {
          key: data.Key,
          versionId: data.VersionId,
          url: data.Location
        };
      })
      .catch((err) => {
        // console.log(err.message);
        throw err.message;
      });

  } catch (err) {
    // console.log(err.message);
    // throw err;
  }
}

const deleteFromS3 = async (key) => {
  try {
    // Delete the object.
    console.log(`\nDeleting object "${key}"} from bucket`);
    await s3Client.send(
      new DeleteObjectCommand({ Bucket: process.env.AWS_BUCKET_NAME, Key: key })
    );
  } catch (err) {
    throw err;
  }
}

module.exports = { uploadToS3, deleteFromS3 }