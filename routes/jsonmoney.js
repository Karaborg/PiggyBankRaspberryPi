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

/* GET users listing. */
router.get('/', function(req, res, next) {
    //res.send('respond with a resource');
    res.render('jsonmoney', { title: 'Express' });
});

router.get('/list',function (req, res) {
    model.list(function (response) {
        res.send(response);
    });
});

module.exports = router;
