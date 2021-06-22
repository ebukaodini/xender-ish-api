let express = require('express');
var router = express.Router();
var multiparty = require('multiparty');
var cloudinary = require('cloudinary').v2;
var util = require('util');

router.get('/', (req, res) => {
  // show a file upload form
  res.writeHead(200, { 'content-type': 'text/html' });
  res.end(
    '<form action="/files/upload" enctype="multipart/form-data" method="post">'+
    '<input type="text" name="title"><br>'+
    '<input type="file" name="upload" multiple="multiple"><br>'+
    '<input type="submit" value="Upload">'+
    '</form>'
  );
})

router.post('/upload', (req, res) => {
  // parse a file upload
  var form = new multiparty.Form();

  form.parse(req, function (err, fields, files) {
    if (err) {
      res.status(500).send(err.toString());
    }
    res.writeHead(200, { 'content-type': 'text/plain' });
    res.write('received upload:\n\n');
    res.end(util.inspect({ fields: fields, files: JSON.stringify(files) }));
  });

  return;
});

module.exports = router;