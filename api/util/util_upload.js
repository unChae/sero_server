// models
const model = require('../../models');
const User = model.User;

// modules
const multer = require('multer');
const multerS3 = require('multer-s3-transform');
const AWS = require('aws-sdk');
const moment = require("moment");
const sharp = require('sharp');

const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region : 'ap-northeast-2'
});
let payload = ''

const storage = multerS3({
  s3,
  bucket: process.env.AWS_S3_BUCKET,
  contentType: multerS3.AUTO_CONTENT_TYPE,
  acl: 'public-read', 
  shouldTransform: function (req, file, cb) {
    let {usSocialValue, usPhoneNumber, usId} = req.body;
    let fileName = file.fieldname;
    let date = moment().format('YYYYMMDDHHmmss');
    switch(fileName){
      case 'poPhoto':
        payload = `post/${usId}/${date}${fileName}.png`;
        break;
      case 'poContentPhoto':
        payload = `post/${usId}/${date}${fileName}.png`;
        break;
      case 'poRecord':
        payload = `post/${usId}/${date}${fileName}.wav`;
        break;
      case 'usPhoto':
        payload = `user/${usPhoneNumber}/${usSocialValue}v${date}${fileName}.png`;
        break;
    }
    if(fileName == 'poRecord'){
      return cb(null, false);
    }
    cb(null, payload);
  },
  transforms: [{
    id: 'original',
    key: function (req, file, cb) {
      let {usSocialValue, usPhoneNumber, usId} = req.body;
      let fileName = file.fieldname;
      let date = moment().format('YYYYMMDDHHmmss');
      switch(fileName){
        case 'poPhoto':
          payload = `post/${usId}/${date}${fileName}.png`;
          break;
        case 'poContentPhoto':
          payload = `post/${usId}/${date}${fileName}.png`;
          break;
        case 'poRecord':
          payload = `post/${usId}/${date}${fileName}.wav`;
          break;
        case 'usPhoto':
          payload = `user/${usPhoneNumber}/${usSocialValue}v${date}v${fileName}.png`;
          break;
      }
      cb(null, payload);
    },
    transform: function (req, file, cb) {
      cb(null, sharp());
    }
  }, {
    id: 'thumbnail',
      key: function (req, file, cb) {
      let {usSocialValue, usPhoneNumber, usId} = req.body;
      let fileName = file.fieldname;
      let date = moment().format('YYYYMMDDHHmmss');
      switch(fileName){
        case 'poPhoto':
          payload = `resized/post/${usId}/${date}${fileName}.png`;
          break;
        case 'poContentPhoto':
          payload = `resized/post/${usId}/${date}${fileName}.png`;
          break;
        case 'poRecord':
          payload = `resized/post/${usId}/${date}${fileName}.wav`;
          break;
        case 'usPhoto':
          payload = `resized/user/${usPhoneNumber}/${usSocialValue}v${date}${fileName}.png`;
          break;
      }
      cb(null, payload);
    },
    transform: function (req, file, cb) {
      cb(null, sharp().resize(300, 300));
    }
  }]
});

module.exports.upload = multer({storage:storage});

