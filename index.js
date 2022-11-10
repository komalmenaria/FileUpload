const express = require('express')
var bodyParser = require('body-parser')
const fileUpload = require("express-fileupload");
const app = express()
const port = 3000





// Load the SDK for JavaScript
var AWS = require('aws-sdk');
// Set the Region 
AWS.config.update({region: 'us-east-1',accessKeyId:'AKIA3YPQCS2VMWVWHKRJ',secretAccessKey: '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'});
// Create S3 service object
const s3 = new AWS.S3();







app.use(fileUpload());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.post('/', async (req, res) => {
 console.log(req.files.image)
 await s3.putObject({
    Key: `Images/${req.files.image.name}`,
    Body:req.files.image.data,
    Bucket:"airavattravel",
    Expires: 3600,
}, (err, s3data) => {
    if (err) {
    //   reject({ Errro: err });
    console.log(err)
    } else {
      console.log("s3data", s3data);
      
    }
  });
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})