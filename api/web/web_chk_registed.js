// models
const model = require('../../models');
const User = model.user;

// utils
const response = require('../util/util_response');

module.exports = async (req, res) => {
  console.log(['web_chk_registed']);
  let {usSocialValue, usSocialId} = req.body;
  let user = await User.findOne({
    where: {usSocialValue, usSocialId}
  })
  .catch(error => {
    response(res, 500, '[web_chk_registed] server error.', error);
    return;
  });
  if(user){
    response(res, 200, '[web_chk_registed] login success.', user);
    return;
  }else{
    response(res, 200, '[web_chk_registed] request regist.', null);
    return;
  }
}

