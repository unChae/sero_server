// models
const model = require('../../models');
const User = model.user;

// utils
const response = require('../util/util_response');
const hash = require('../util/util_hash');

module.exports = async (req, res) => {
  console.log(['app_set_user']);
  let {usSocialValue, usPhoneNumber, usName, usPhoto, usAddress, usAddressDetail, usAddressNumber, usPassword, usSocialId} = req.body;
  let user;
  user = await User.findOne({
    where: {usSocialValue, usPhoneNumber}
  })
  .catch((error) => {
    response(res, 500, '[app_set_user] server error.', error);
  });
  if(user){
    response(res, 409, '[app_set_user] already exit user.', user);
  }else{
    if(usSocialValue == 0){
      // seropost user
      let _usPassword = await hash.hashing(usPassword)
      .catch((error) => {
        response(res, 500, '[app_set_user] server error.', error);
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
        response(res, 500, '[app_set_user] server error.', error);
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
        response(res, 500, '[app_set_user] server error.', error);
      });
    }
    response(res, 200, '[app_set_user] success', user);
  }
}

