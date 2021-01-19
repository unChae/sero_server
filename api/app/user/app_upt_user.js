// models
const model = require('../../../models');
const User = model.user;

// utils
const response = require('../../util/util_response');

module.exports = async (req,res) => {
  console.log(['app_upt_user']);
  let {usId, usAlarm, usName, usAddress, usAddressDetail, usAddressNumber, usPhoto, usFcmToken} = req.body;
  await User.update({
    usName,
    usAddress,
    usAddressDetail,
    usAddressNumber,
    usPhoto,
    usAlarm,
    usFcmToken,
  },{
    where: {usId},
  })
  .catch(error => {
    response(res, 500, '[app_upt_user] server error.', error);
    return;
  });
  response(res, 200, '[app_upt_user] success.', null);
};