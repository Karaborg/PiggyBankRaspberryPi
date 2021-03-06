/*jshint esversion: 6 */
"use strict";

const fs = require('fs');
const AWS = require('aws-sdk');

const bucket = '.....';
const accessKeyId = '.....';
const secret = '.....';
const region = '.....';
const signatureVersion = 'v4';


exports.upload = function (filePath, filename, callback) {
    AWS.config.update({
        accessKeyId: accessKeyId,
        secretAccessKey: secret,
        region: region,
        signatureVersion: signatureVersion
    });

    fs.readFile(filePath, function (err, data) {
        console.log("data")
        console.log(data)
        console.log("data")

        console.log("filePath")
        console.log(filePath)
        console.log("filePath")

        if (err) {
            console.log(err);
        }

        var s3 = new AWS.S3({
            params: {
                Bucket: bucket,
                Key: filename,
                ContentType: 'image/png',
                ACL: 'public-read'
            }
        });

        s3.upload({
            Body: data
        }, function (err, data) {

            if (err) {
                callback(err,"");
            }else{
                console.log("successs !!!!!")
                console.log(data)
                callback(null, data);
            }

        });

    });
};
