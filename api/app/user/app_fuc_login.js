// models
const model = require('../../../models');
const User = model.user;
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

// utils
const response = require('../../util/util_response');
const hash = require('../../util/util_hash');
const token = require('../../util/util_token');

module.exports = async (req, res) => {
  console.log(['app_fuc_login']);
  console.log(req.body);
  let {usSocialValue, usPhoneNumber, usPassword, usSocialId} = req.body;
  usSocialId = usSocialId ? usSocialId : 0;
  usPhoneNumber = usPhoneNumber ? usPhoneNumber : '';
  let user = await User.findOne({
    raw: true,
    where: {
      [Op.or]: [
        {usSocialValue, usPhoneNumber},
        {usSocialValue, usSocialId},
      ]
    },
  })
  .catch(error => {
    response(res, 500, '[app_fuc_login] server error.', error);
    return;
  });
  let usJwtToken;
  if(user){
    if(usSocialValue == 0){
      // seropost user
      let _usPassword = user.usPassword;
      let chk = await hash.compare(usPassword, _usPassword)
      .catch(error => {
        response(res, 500, '[app_fuc_login] server error.', error);
        return;
      });
      if(chk){
        usJwtToken = token(user);
        User.update({
          usJwtToken
        }, {
          where: {usSocialValue, usPhoneNumber}
        })
        .catch(error => {
          response(res, 500, '[app_fuc_login] server error.', error);
          return;
        });
      }else{
        response(res, 409, '[app_fuc_login] ID or password error.', null);
        return;
      }
    }else{
      // social user
      usJwtToken = token(user);
      User.update({
        usJwtToken
      }, {
        where: {usSocialValue, usSocialId}
      })
      .catch(error => {
        response(res, 500, '[app_fuc_login] server error.', error);
        return;
      });
    }
  }else{
    response(res, 409, '[app_fuc_login] ID or password error.', null);
    return;
  }
  user.usJwtToken = usJwtToken;
  response(res, 200, '[app_fuc_login] success', user);
  return;
}

