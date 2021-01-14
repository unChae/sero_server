// models
const model = require('../../models');
const User = model.user;

// utils
const response = require('../util/util_response');
const hash = require('../util/util_hash');

module.exports = async (req, res) => {
  console.log(['web_fuc_login']);
  let {usSocialValue, usPhoneNumber, usName, usAddress, usAddressDetail, usAddressNumber, usPassword, usSocialId} = req.body;
  let user;
  let usPhoto = req.files[0].transforms[1].location.split('https://seropost-data.s3.ap-northeast-2.amazonaws.com/')[1];
  user = await User.findOne({
    where: {usSocialValue, usPhoneNumber}
  })
  .catch((error) => {
    response(res, 500, '[web_fuc_login] server error.', error);
  });
  if(user){
    response(res, 409, '[web_fuc_login] already exit user.', user);
  }else{
    if(usSocialValue == 0){
      // seropost user
      let _usPassword = await hash.hashing(usPassword)
      .catch((error) => {
        response(res, 500, '[web_fuc_login] server error.', error);
      });
      user = await User.create({
        usSocialValue,
        usPhoneNumber,
        usName,
        usPhoto,
        usAddress,
        usAddressDetail,
        usAddressNumber,
        usPassword: _usPassword,
      })
      .catch((error) => {
        response(res, 500, '[web_fuc_login] server error.', error);
      });
    }else{
      // social user
      user = await User.create({
        usSocialValue,
        usPhoneNumber,
        usName,
        usPhoto,
        usAddress,
        usAddressDetail,
        usAddressNumber,
        usSocialId,
      })
      .catch((error) => {
        response(res, 500, '[web_fuc_login] server error.', error);
      });
    }
    response(res, 200, '[web_fuc_login] success', user);
  }
}

