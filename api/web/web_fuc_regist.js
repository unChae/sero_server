// models
const model = require('../../models');
const User = model.user;

// utils
const response = require('../util/util_response');
const hash = require('../util/util_hash');

module.exports = async (req, res) => {
  console.log(['web_fuc_regist']);
  let {usSocialValue, usPhoneNumber, usName, usAddress, usAddressDetail, usAddressNumber, usPassword, usSocialId} = req.body;
  let user;
  let usPhoto = req.files[0].transforms[1].location.split('https://seropost-data.s3.ap-northeast-2.amazonaws.com/')[1];
  user = await User.findOne({
    where: {usSocialValue, usPhoneNumber}
  })
  .catch((error) => {
    response(res, 500, '[web_fuc_regist] server error.', error);
    return;
  });
  if(user){
    response(res, 409, '[web_fuc_regist] already exit user.', user);
    return;
  }else{
    if(usSocialValue == 0){
      // seropost user
      let _usPassword = await hash.hashing(usPassword)
      .catch((error) => {
        response(res, 500, '[web_fuc_regist] server error.', error);
        return;
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
        response(res, 500, '[web_fuc_regist] server error.', error);
        return;
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
        response(res, 500, '[web_fuc_regist] server error.', error);
        return;
      });
    }
    response(res, 200, '[web_fuc_regist] success', user);
    return;
  }
}

