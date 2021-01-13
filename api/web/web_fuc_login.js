// models
const model = require('../../models');
const User = model.user;

// utils
const response = require('../util/util_response');
const hash = require('../util/util_hash');
const token = require('../util/util_token');

module.exports = async (req, res) => {
  console.log(['web_fuc_login']);
  let {usSocialValue, usPhoneNumber, usPassword, usSocialId} = req.body;
  let usJwtToken;
  let user = await User.findOne({
    raw: true,
    where: {usPhoneNumber}
  })
  .catch(error => {
    response(res, 500, '[web_fuc_login] server error.', error);
  });
  if(user){
    if(usSocialValue == 0){
      // seropost user
      let _usPassword = user.usPassword;
      let chk = await hash.compare(usPassword, _usPassword)
      .catch(error => {
        response(res, 500, '[web_fuc_login] server error.', error);
      });
      if(chk){
        usJwtToken = token(user);
        User.update({
          usJwtToken
        }, {
          where: {usPhoneNumber}
        })
        .catch(error => {
          response(res, 500, '[web_fuc_login] server error.', error);
        });
      }else{
        response(res, 409, '[web_fuc_login] ID or password error.', null);
      }
    }else{
      // social user
      usJwtToken = token(user);
      User.update({
        usJwtToken
      }, {
        where: {usPhoneNumber}
      })
      .catch(error => {
        response(res, 500, '[web_fuc_login] server error.', error);
      });
    }
    user.usJwtToken = usJwtToken;
    response(res, 200, '[web_chk_token] success', user);
  }else{
    response(res, 409, '[web_fuc_login] ID or password error.', null);
  }
}

