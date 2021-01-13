// models
const model = require('../../models');
const User = model.user;

// utils
const response = require('../util/util_response');
const hash = require('../util/util_hash');

module.exports = async (req, res) => {
  // Todo
  // chk already exist user
  console.log(['web_fuc_login']);
  let {usSocialValue, usPhoneNumber, usName, usPhoto, usAddress, usAddressDetail, usAddressNumber, usPassword, usSocialId} = req.body;
  let user;
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

