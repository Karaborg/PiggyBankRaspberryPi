var express = require('express');
var router = express.Router();
const multer =  require('multer');
const fs = require('fs');
const path = require('path');
const s3Service = require('../core/helper/S3Service')

var async = require("async");
var request = require('request');
var mongoose = require('mongoose');
var database = require('../core/database.js');
var model = require('../core/Model/model.js');
var modelUser = require('../core/Model/modelUser.js');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

var currentUser;


router.post('/newImage',function (req, res) {
  var data = req.body;
  //console.log(data)

  if (data.H == "create"){
    modelUser.findById(data.username, function (response) {
      //console.log(response)
      if (response.account == null){
        modelUser.create(req.body,function (response) {
          res.send(response)
        })
      }else{
        res.send("Already")
      }
    })
  } else if (data.H == "pic"){
    model.create(req.body,function (response) {
      res.send(response)
      //console.log(data)
    })
  } else if (data.H == "login") {
    modelUser.findById(data.username, function (response) {
      //console.log(response)
      if (response.account == null){
        //console.log("No Info")
        res.send("noInfo")
      } else if (response.account != null && response.account.username == data.username && response.account.password != data.password){
        //console.log("Wrong Password")
        res.send("wrongPassword")
      }else{
        res.send(response)
        currentUser = response.account.username;
        //console.log("this is the user: " + currentUser)
      }
    })
  }
})

router.get('/list',function (req, res) {
  model.list(function (response) {
    res.send(response)
  })
});

router.get('/listUser',function (req, res) {
  modelUser.list(function (response) {
    res.send(response)
  })
});

const uploadPath = path.join(__dirname, '../public/panelUploads');

const imageFileFilter = function (req, file, cb) {
  var extension = file.originalname.split('.').pop();
  if (extension === 'png') {
    cb(null, true);
  } else if (extension === 'jpg') {
    cb(null, true);
  } else if (extension === 'jpeg') {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

var imageStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadPath);
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + '.png');
  }
});

router.post('/upload', [multer({
  storage: imageStorage,
  fileFilter: imageFileFilter
}).single('image'), function (req, res) {

  //console.log(uploadPath);
  if (req.file === null || req.file === undefined) {
    //Invalid file
    /*console.log("req.file")
    console.log(req.file)
    console.log("req.file")*/
    res.send({success: false, message: 'Invalid file'});
  } else {
    //console.log(req.file);
    var filePath = req.file.path;
    var filename = req.file.filename;

    //console.log(filePath);
    //console.log(filename);
    s3Service.upload(filePath, filename, function (err,imageUrl) {
      //console.log("imageUrl");
      //console.log(imageUrl);
      //console.log("imageUrl");
      res.send({success: true, path: imageUrl.Location});
    });
  }
}]);

module.exports = router;
