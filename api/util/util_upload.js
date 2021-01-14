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
    cb(null, /^image/i.test(file.mimetype))
  },
  transforms: [{
    id: 'original',
    key: function (req, file, cb) {
      let {usPhoneNumber, poId} = req.body;
      let fileName = file.fieldname;
      let date = moment().format('YYYYMMDDHHmmss');
      let type = file.mimetype;
      type = type.split('/')[1];
      if(!type) {
        type = file.mimetype;
      }
      switch(fileName){
        case 'poPhoto':
          payload = `${usPhoneNumber}/post/${poId}/${date}${file.fieldname}.${type}`;
          break;
        case 'poRecord':
          payload = `${usPhoneNumber}/post/${poId}/${date}${file.fieldname}.${type}`;
          break;
        case 'usPhoto':
          payload = `${usPhoneNumber}/user/${file.fieldname}.${type}`;
          break;
      }
      cb(null, payload);
    },
    transform: function (req, file, cb) {
      cb(null, sharp())
    }
  }, {
    id: 'thumbnail',
      key: function (req, file, cb) {
      let {usPhoneNumber, poId} = req.body;
      let fileName = file.fieldname;
      let date = moment().format('YYYYMMDDHHmmss');
      let type = file.mimetype;
      type = type.split('/')[1];
      if(!type) {
        type = file.mimetype;
      }
      switch(fileName){
        case 'poPhoto':
          payload = `resized/${usPhoneNumber}/post/${poId}/${date}${file.fieldname}.${type}`;
          break;
        case 'poRecord':
          payload = `resized/${usPhoneNumber}/post/${poId}/${date}${file.fieldname}.${type}`;
          break;
        case 'usPhoto':
          payload = `resized/${usPhoneNumber}/user/${file.fieldname}.${type}`;
          break;
      }
      cb(null, payload);
    },
    transform: function (req, file, cb) {
      cb(null, sharp().resize(100, 100))
    }
  }]
});

module.exports.upload = multer({storage:storage});

