// models
const model = require('../../../models');
const User = model.user;

// utils
const response = require('../../util/util_response');

module.exports = async (req, res) => {
  console.log(['app_chk_token']);
  let {usId, usJwtToken} = req.body;
  let user = await User.findOne({
    where: {usId, usJwtToken}
  })
  .catch(error => {
    response(res, 500, '[app_chk_token] server error.', error);
    return;
  });
  if(!user) {
    response(res, 409, '[app_chk_token] invalid token.');
    return;
  } else {
    response(res, 200, '[app_chk_token] success', user);
    return;
  }
}

