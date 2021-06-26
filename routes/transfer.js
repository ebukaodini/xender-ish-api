let express = require('express');
var router = express.Router();
var multiparty = require('multiparty');
var cloudinary = require('cloudinary').v2;

// configuring cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUDNAME,
  api_key: process.env.CLOUDINARY_APIKEY,
  api_secret: process.env.CLOUDINARY_APISECRET,
  secure: true
});

var util = require('util');

/**
 * Temporary route to handle testing
 * This route serves the form to upload files
 * This route would not be available on live pllatform
 */
router.get('/', (req, res) => {
  // show a file upload form
  res.writeHead(200, { 'content-type': 'text/html' });
  res.end(
    '<form action="/files/upload" enctype="multipart/form-data" method="post">' +
    '<input type="text" name="title"><br>' +
    '<input type="file" name="upload" multiple="multiple"><br>' +
    '<input type="submit" value="Upload">' +
    '</form>'
  );
})

/**
 * Route to upload files
 */
router.post('/upload', (req, res) => {
  // parse a file upload
  var form = new multiparty.Form();

  form.parse(req, function (err, fields, files) {
    if (err) {
      res.status(500).send(err.toString());
    }

    console.log(JSON.stringify(files.upload[0]));

    /**
     * Working with cloudinary
     */
    cloudinary.uploader.upload(
      files.upload[0].path, {
      tags: 'basic_sample',
      folder: 'xender-ish',

      discard_original_filename: false,
      use_filename: true,
      resource_type: 'raw',
      // type: files.upload[0].headers['content-type'],
      // type: 'raw',
      overwrite: false,
    }, function (err, image) {
      if (err) {
        res.status(500).send(JSON.stringify(err));
      }

      let output = `
      ** File Upload
      * public_id for the uploaded image is generated by Cloudinary's service.\n
      * ${image.public_id}\n
      * ${image.url}
      * ${JSON.stringify({ fields: fields, files: files })};
      `;

      res.writeHead(200, { 'content-type': 'text/plain' });
      res.write('received upload:\n\n');
      res.end(output);

    });

  });

  return;
});


/**
 * Route to upload files
 */
router.post('/upload', (req, res) => {

});

/**
 * Route to transfer details
 */
router.get('/transfer/:id?recipient=:recipient')

/**
 * Route to download a particular file
 */
router.get('/download/:', (req, res) => {

});

/**
 * Route to download all files in this upload
 */
router.post('/upload', (req, res) => {

});

module.exports = router;